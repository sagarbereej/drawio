function menuActions(Actions,action) {
    this.Actions = Actions;
    this.action = action;
    this.menuActions = new Object();
    this.init();
};

menuActions.prototype.init = function () {

    this.Actions.addAction('connectAWSAccount', function () {
        console.log('Connect your AWS Account');

        var user = firebase.auth().currentUser;
        if (user == null) {
            showSnackbar("There you are. Oh! But we don't know who you are. Do you mind to sign-in ?", 5);
            return;
        }

        _graph.connectionHandler.setCreateTarget(!_graph.connectionHandler.isCreateTarget());

        _editorUi.showDialog(new CloudAccountDialog(_editorUi).container, 650, 350, true, true, function () {
            showingAbout = false;

        });
        accountTable();

    });
    this.Actions.addAction('createFromAWS', async function () {
        console.log('Create Diagram from AWS');
        var user = firebase.auth().currentUser;
        console.log('Logged-in user (Actions.js) : ', user);
        if (user == null) {
            onGoogleSignIn();
        }
        else {
            console.log('Actions.js > in createFromAWS');
            await getXHR();

        }


    });


    this.Actions.addAction('clouderLogin', function () {
        var user = firebase.auth().currentUser;

        if (user == null) {
            // onGoogleSignIn();
            _editorUi.showDialog(new SignInDialog(_editorUi).container, 400, 350, true, true, function () {
                showingAbout = false;
            });
            return;
        }
        else {
            showSnackbar("Did you forget ? You are already logged in :)");
        }
    });

    this.Actions.addAction('clouderLogout', function () {
        // var user = firebase.auth().currentUser;

        signout();
    });

    this.Actions.addAction('makeInAWS', function () {
        // TODO : Code-refactor. It's really important since the below code is q_editorUite patchy (but written with love)
        var user = firebase.auth().currentUser;
        console.log('Logged-in user (Actions.js) : ', user);
        if (user == null) {
            onGoogleSignIn();
        }
        else {
            console.log('Actions.js > in makeInAWS');
            // _graph.connectionHandler.setCreateTarget(!_graph.connectionHandler.isCreateTarget());
            // var dlg = new EditDiagramDialog(_editorUi);
            // console.log(dlg.bingValue);
            // _editorUi.fireEvent(new mxEventObject('makeInAWSChanged'));
            // debugger;
            sendXHR( mxUtils.getPrettyXml(_editorUi.editor.getGraphXml()));
        }

    });
    // action.setToggleAction(true);
    this.action.setSelectedCallback(function () {
        return _graph.connectionHandler.isCreateTarget();
    });

    function sendXHR(text, cb) {
        var xhr = new XMLHttpRequest();
        var self = this;
        // xhr.open('POST', "https://localhost:44392/api/clouder/");
        // xhr.open('POST', "http://localhost:5001/api/clouder");
        ////--------SK06022023
        // xhr.open('POST', "https://clouderapis.azurewebsites.net/api/clouder/");
        // xhr.open('POST', "https://localhost:44392/api/clouder/");
        // if (window.location.hostname.includes("test")) {
        // 	xhr.open('POST', "https://clouderapis-test.azurewebsites.net/api/clouder/PushToCloud");
        // } else if  (window.location.hostname.includes("cloudernode")) {
        // 	xhr.open('POST', "https://clouderapis-test.azurewebsites.net/api/clouder/PushToCloud");
        // } else if (window.location.hostname.includes("demo")) {
        // 	xhr.open('POST', "https://clouderapis-demo.azurewebsites.net/api/clouder/PushToCloud");
        // } else {
        xhr.open('POST', baseApiUrl + "PushToCloud");
        // }


        ////----------------
        // xhr.open('POST', "https://cors-anywhere.herokuapp.com/https://clouderapis.azurewebsites.net/api/clouder/");
        // xhr.open('POST', "https://ucbu630js1.execute-api.ap-south-1.amazonaws.com/v1/clouder/ec2");
        // xhr.open('POST', "https://cors-anywhere.herokuapp.com/https://pwayz1fauk.execute-api.ap-south-1.amazonaws.com/v1/clouder/ec2");
        // xhr.open('POST', "https://clouderapis.azurewebsites.net/api/clouder/author/bing");
        // xhr.open('POST', "https://0uamtrqsvb.execute-api.ap-south-1.amazonaws.com/v1/clouder");
        // xhr.open('POST', "https://clouderapis.azurewebsites.net/api/clouder/resources");
        // console.log("^^^^^^^^^^^^^^^^^", result);
        // xhr.open('POST', "https://localhost:5001/api/clouder/");
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.setRequestHeader('Accept', 'application/json');
        // xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://127.0.0.1/5501');
        // xhr.setRequestHeader('Access-Control-Allow-Credentials', 'true');
        // debugger;
        var jsonData = JSON.stringify({ "DiagramXml": text, "UserId": login_user_id });
        // jsonData = JSON.stringify({'AccessKeyId':'AKIA24BXXPAKSUWNNN53','AccessKey':'h5IixtCxQYaFq5dFDgA0AHLYLRbhhIzTr90YBslT','ImageId':'ami-00b6a8a2bd28daf19','InstanceType':'t2.nano','KeyName':'clouder-test'});
        // to create vpc :
        // jsonData = JSON.stringify({'AccessKeyId':'AKIA24BXXPAKSUWNNN53','AccessKey':'h5IixtCxQYaFq5dFDgA0AHLYLRbhhIzTr90YBslT'});
        ShowSnackBarWait("Please wait...Creating and Updating Cloud")
        xhr.send(jsonData);
        // xhr.send(JSON.stringify({}));
        // xhr.send();
        xhr.onload = function () {
            // debugger;
            var res = JSON.parse(xhr.responseText)
            console.log('--------------------');
            console.log(res);
            HideSnackBar()
            _editorUi.showDialog(new ShowResponseDialog(_editorUi, null, res.replaceAll('["', '').replaceAll('"]', '').replaceAll('","', '')).container, 600, 350, true, true, function () {
                showingAbout = false;
            });
            return res;



        }
        // xhr.send();
    }
    async function getXHR() {
        var xhr = new XMLHttpRequest();
        // if (window.location.hostname.includes("test")) {
        // 	await xhr.open('POST', "https://clouderapis-test.azurewebsites.net/api/clouder/GetCloud");
        // } else if  (window.location.hostname.includes("cloudernode")) {
        // 	await xhr.open('POST', "https://clouderapis-test.azurewebsites.net/api/clouder/GetCloud");
        // } else if (window.location.hostname.includes("demo")) {
        // 	await xhr.open('POST', "https://clouderapis-demo.azurewebsites.net/api/clouder/GetCloud");
        // } else {
        xhr.open('POST', baseApiUrl + "GetCloud");
        // }
        await xhr.setRequestHeader('Content-type', 'application/json');
        var jsonData = JSON.stringify({
            "UserId": login_user_id
        });
        ShowSnackBarWait("Please wait...Creating diagram from AWS")
        await xhr.send(jsonData);
        xhr.onload = async function () {
            var res = await JSON.parse(xhr.responseText)
            console.log('--------------------');
            console.log(res);
            HideSnackBar()
            await serverResponse(res);
            return res;
        }
    }
    const messages = ['AWS diagram detected. Listing components....', 'Finding eq_editorUivalent components in Azure', 'Optimising the components.', 'Almost there......just a sec.', 'Your AWS network has been successfully converted to MS Azure with eq_editorUivalent sized components.']
    function start(counter) {
        var x = document.getElementById("snackbar");
        var delay = 1000 + counter * 700;
        if (counter < messages.length) {
            setTimeout(function () {
                counter++;
                console.log(counter);
                x.innerHTML = messages[counter];
                x.classList.add("show");
                start(counter);
            }, delay);
        }
        else {
            console.log("removing snackbar");
            x.classList.remove("show");
            return 'AOK';
        }
    }

    function displayConvertToAzureMessages() {
        start(0);

    }

    function serverResponse(data) {
        var dlg = new EditDiagramDialog(_editorUi);  // TODO : DO we need this line ?
        _editorUi.editor.graph.model.beginUpdate();
        console.log(data['diagramXml']);
        console.log(mxUtils.parseXml(data['diagramXml']).documentElement);
        _editorUi.editor.setGraphXml(mxUtils.parseXml(data['diagramXml']).documentElement);
        _editorUi.editor.graph.model.endUpdate();
        ShowSnackBar(data['displayMessage'])
        if (!IsLiveMonitoringStart) {
            _editorUi.showDialog(new ConfirmationDialog(_editorUi, null, mxResources.get('confirmationmsg4'), 'monitoring').container, 400, 150, true, true, function () {
                showingAbout = false;
            });
        }
        else {
            MonitoringChange(true);
        }
    }
    function ShowSnackBar(txtMSG) {
        var x = document.getElementById("snackbar");
        x.innerHTML = txtMSG;
        x.className = "show";
        // console.log("show1")
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    }
    function ShowSnackBarWait(txtMSG) {
        var x = document.getElementById("snackbar");
        x.innerHTML = txtMSG;
        x.className = "show";
        // console.log("show")
    }
    function HideSnackBar() {
        var x = document.getElementById("snackbar");
        x.innerHTML = "";
        x.className = "";
    }

    this.Actions.addAction('convertToAzure', function () {
        console.log('Actions.js > COnvert to Azure');
        // alert('okie dokie');
        var x = document.getElementById("snackbar");
        x.innerHTML = 'Analysing....Please wait';
        console.log("adding snackkbar...")
        x.classList.add("show");
        // setTimeout(displayConvertToAzureMessages, 3000);
        // start(0);

        var dlg = new EditDiagramDialog(_editorUi);  // TODO : DO we need this line ?
        let modifiedDiagramXml = dlg.bingValue;
        setTimeout(function () {
            x.innerHTML = 'Analysing....Please wait';
            console.log("adding snackkbar...")
            x.classList.add("show");
            _editorUi.editor.graph.model.beginUpdate();
            modifiedDiagramXml = modifiedDiagramXml.replaceAll('resourcetype="awsec2"', 'resourcetype="azurevm"');
            modifiedDiagramXml = modifiedDiagramXml.replaceAll('shape=mxgraph.aws3.virtual_private_cloud;', 'shape=mxgraph.azure.virtual_network;');
            modifiedDiagramXml = modifiedDiagramXml.replaceAll('awsaccount=work;', 'azureaccount=work');
            modifiedDiagramXml = modifiedDiagramXml.replaceAll('awsaccount="work"', 'azureaccount="work"');
            modifiedDiagramXml = modifiedDiagramXml.replaceAll('shape=mxgraph.aws3.cloud', 'shape=mxgraph.azure.cloud;');
            modifiedDiagramXml = modifiedDiagramXml.replaceAll('', '');
            modifiedDiagramXml = modifiedDiagramXml.replaceAll("fillColor=#F58534;", "fillColor=#00BEF2;");
            // modifiedDiagramXml = modifiedDiagramXml.replaceAll('fillColor=#F58536;','fillColor=#00BEF2;');
            // modifiedDiagramXml = modifiedDiagramXml.replaceAll("fillColor=#F58534;","fillColor=#00BEF2;");
            _editorUi.editor.setGraphXml(mxUtils.parseXml(modifiedDiagramXml).documentElement);
            _editorUi.editor.graph.model.endUpdate();


        }, 2000);
        setTimeout(function () {
            x.innerHTML = 'Your AWS network has been successfully converted to MS Azure with eq_editorUivalent components.';
            console.log("adding snackkbar...")
            x.classList.add("show");
            _editorUi.editor.graph.model.beginUpdate();
            modifiedDiagramXml = modifiedDiagramXml.replaceAll("shape=mxgraph.aws3.ec2;", "shape=mxgraph.azure.virtual_machine;");
            modifiedDiagramXml = modifiedDiagramXml.replaceAll("shape=mxgraph.aws3.application_load_balancer;", "shape=mxgraph.azure.azure_load_balancer;");
            modifiedDiagramXml = modifiedDiagramXml.replaceAll('fillColor=#F58536;', 'fillColor=#00BEF2;');
            modifiedDiagramXml = modifiedDiagramXml.replaceAll("fillColor=#F58534;", "fillColor=#00BEF2;");
            modifiedDiagramXml = modifiedDiagramXml.replaceAll('vmsize="t2.micro"', 'vmsize="B1s" provider="MS Azure" ');
            modifiedDiagramXml = modifiedDiagramXml.replaceAll('width="76.5" height="93"', 'width="70" height="70"');
            modifiedDiagramXml = modifiedDiagramXml.replaceAll('width="69" height="72"', 'width="70" height="50"');
            modifiedDiagramXml = modifiedDiagramXml.replaceAll('shape=mxgraph.aws3.rds;', 'shape=mxgraph.azure.database;');
            modifiedDiagramXml = modifiedDiagramXml.replaceAll('fillColor=#F58536;', 'fillColor=#00BEF2;');
            modifiedDiagramXml = modifiedDiagramXml.replaceAll('', '');
            modifiedDiagramXml = modifiedDiagramXml.replaceAll("fillColor=#F58534;", "fillColor=#00BEF2;");
            modifiedDiagramXml = modifiedDiagramXml.replaceAll('strokeColor=#ff0000;', 'strokeColor=#00BEF2;');
            modifiedDiagramXml = modifiedDiagramXml.replaceAll('strokeColor=#F59D56;', 'strokeColor=#80DDF6;');
            modifiedDiagramXml = modifiedDiagramXml.replaceAll('ec2keypair="aws_ubuntu_vm_01"', 'vmaccesskey="azure_vm_01"');
            modifiedDiagramXml = modifiedDiagramXml.replaceAll('ami="Ubuntu Server 18.04 LTS HVM, SSD Volume Type (ami-007d5db58754fa284)"', 'image="Red Hat Linux 7.8"');
            modifiedDiagramXml = modifiedDiagramXml.replaceAll('subnet="subnet-0f0e518adb0f89aea (ap-south-1b)"', 'subnet="GatewaySubnet (West India)"');
            _editorUi.editor.setGraphXml(mxUtils.parseXml(modifiedDiagramXml).documentElement);
            _editorUi.editor.graph.model.endUpdate();

        }, 4000);

        setTimeout(() => {
            x.classList.remove("show");
        }, 7000);

        // setTimeout(() => {

        // 	// modifiedDiagramXml = modifiedDiagramXml.replaceAll('shape=mxgraph.aws3.cloud;','shape=mxgraph.azure.virtual_network;');


        // 	// modifiedDiagramXml = modifiedDiagramXml.replaceAll('strokeColor=#ff0000;','strokeColor=#00BEF2;');
        // 	// modifiedDiagramXml = modifiedDiagramXml.replaceAll('strokeColor=#F59D56;','strokeColor=#80DDF6;');
        // 	// modifiedDiagramXml = modifiedDiagramXml.replaceAll('ec2keypair="aws_ubuntu_vm_01"','vmaccesskey="azure_vm_01');
        // 	// modifiedDiagramXml = modifiedDiagramXml.replaceAll('ami="Ubuntu Server 18.04 LTS HVM, SSD Volume Type (ami-007d5db58754fa284)"','image="Red Hat Linux 7.8"');
        // 	// modifiedDiagramXml = modifiedDiagramXml.replaceAll('subnet="subnet-0f0e518adb0f89aea (ap-south-1b)"','subnet="GatewaySubnet (West India)"');

        // }, 7000);





        // debugger;
        _editorUi.editor.graph.model.beginUpdate();
        _editorUi.editor.setGraphXml(mxUtils.parseXml(modifiedDiagramXml).documentElement);
        _editorUi.editor.graph.model.endUpdate();
        // var dlg = new EditDiagramDialog(_editorUi);
        // console.log(dlg.bingValue);
        x.classList.remove("show");

        // setTimeout(function(){


        // },5000);



    });

    this.Actions.addAction('makeInAzure', function () {
        // graph.connectionHandler.setCreateTarget(!graph.connectionHandler.isCreateTarget());
        // _editorUi.fireEvent(new mxEventObject('makeInAzureChanged'));
        // // Menus.prototype.defaultEC2KeyPairs = ['<Create new>','aws_ubuntu_vm_01','aws_vm_access_02','aaaaaa'];
        // bingoFunction(this,this.defaultEC2KeyPairs,'ec2keypair','awsEC2KeyPairChanged');
        var x = document.getElementById("snackbar");
        x.innerHTML = 'Uh oh! This feature is not yet available. But don\'t worry. We are almost there.';
        console.log("adding snackkbar...")
        x.classList.add("show");
        setTimeout(function () { x.classList.remove("show"); }, 4000);

    });
    this.action.setToggleAction(true);
    this.action.setSelectedCallback(function () { return _graph.connectionHandler.isCreateTarget(); });


    this.Actions.addAction('makeInGCP', function () {
        _graph.connectionHandler.setCreateTarget(!_graph.connectionHandler.isCreateTarget());
        _editorUi.fireEvent(new mxEventObject('makeInGCPChanged'));
    });
    this.action.setToggleAction(true);
    this.action.setSelectedCallback(function () { return _graph.connectionHandler.isCreateTarget(); });
}
