
function createSignInButton(width, height, src, onclick) {
	var signInbutton = document.createElement('img');
	signInbutton.style.border = '0px';
	signInbutton.setAttribute('width', width);
	if (height != 0) signInbutton.setAttribute('height', height);
	signInbutton.setAttribute('src', IMAGE_PATH + src);
	signInbutton.setAttribute("class", "mr-3 cursor-pointer");
	signInbutton.setAttribute('onclick', onclick);
	return signInbutton;
}

var SignInDialog = function (editorUi) {
	geditorUi = editorUi;
	var div = document.createElement('div');
	div.setAttribute('align', 'center');
	var h3 = document.createElement('h3');
	mxUtils.write(h3, 'Sign-in!');
	div.appendChild(h3);
	mxUtils.write(div, 'It might be a good idea to sign-in before continue.');

	mxUtils.br(div);
	mxUtils.br(div);
	mxUtils.br(div);
	mxUtils.br(div);

	var imgGoogleSignIn = createSignInButton(200, 0, '/clouder/google-sign-in.png', 'onGoogleSignInButtonClick()');
	var imgMicrosoftSignIn = createSignInButton(200, 0, '/clouder/microsoft-sign-in.png', 'onMicrosoftSignInButtonClick()');
	var imgTwitterSignIn = createSignInButton(80, 0, '/clouder/twitter-icon.png', 'onTwitterSignInButtonClick()');
	var imgGithubSignIn = createSignInButton(65, 0, '/clouder/github-icon.png', 'onGithubSignInButtonClick()');

	div.appendChild(imgGoogleSignIn)
	mxUtils.br(div);
	mxUtils.br(div);
	div.appendChild(imgMicrosoftSignIn);
	mxUtils.br(div);
	mxUtils.br(div);
	div.appendChild(imgTwitterSignIn);
	div.appendChild(imgGithubSignIn);

	this.container = div;
};

function onGoogleSignInButtonClick() {
	geditorUi.hideDialog();
	onGoogleSignIn();
}
function onMicrosoftSignInButtonClick() {
	geditorUi.hideDialog();
	onMicrosoftSignIn();


	console.log("Signing in with Microsoft account");
}
function onTwitterSignInButtonClick() {
	geditorUi.hideDialog();
	onTweeterSignIn();
}
function onGithubSignInButtonClick() {
	geditorUi.hideDialog();
	onGithubSignIn();
}

function createCloudAccountTextbox(placeholder) {
	var textbox = document.createElement('input');
	textbox.setAttribute('placeholder', placeholder);
	textbox.setAttribute('value', placeholder);
	textbox.setAttribute('type', 'text');
	textbox.setAttribute('size', (mxClient.IS_IE || mxClient.IS_IE11) ? '36' : '40');
	textbox.style.boxSizing = 'border-box';
	textbox.style.marginLeft = '2px';
	textbox.style.width = '90%';
	return textbox;
}
function createCloudAccountTextboxLabel(text) {
	var label = document.createElement('label');
	label.innerHTML = text;
	return label;
}

async function _saveAccountDetailsToLocalStorage(accessKeyId, accessKey, accountName) {
	console.log("Setting AWS access key id and key into the local storage");
	await localStorage.setItem("AccessKeyId", accessKeyId);
	await localStorage.setItem("AccessKey", accessKey);
	await localStorage.setItem("AccountName", accountName);
}

function _getAWSAccessKeyIdFromLocalStorage() {
	return localStorage.getItem("AccessKeyId");
}
function _getAWSAccessKeyFromLocalStorage() {
	return localStorage.getItem("AccessKey");
}
function _getAWSAccountNameFromLocalStorage() {
	return localStorage.getItem("AccountName");
}


async function _saveAccountDetailsToFirestore(accessKeyId, accessKey, accountName) {
	console.log("Setting AWS access key id and key in Firestore");
	// const jBody = JSON.stringify({ "AccessKeyId": "AKIA24BXXPAKSUWNNN53","AccessKey": "h5IixtCxQYaFq5dFDgA0AHLYLRbhhIzTr90YBslT" });
	const user = await firebase.auth().currentUser;
	await db.collection("Users")
		.doc(user.uid)
		.collection("CloudAccounts")
		.doc("AWS")
		.set({
			"AccessKeyId": accessKeyId,
			"AccessKey": accessKey,
			"AccountName": accountName
		}).then(() => {
			console.log('AWS Credentials are successfully set in Firestore');
		}).catch(err => {
			console.log('Oops :', err);
		});
}
async function _saveAccountDetailsToDatabase(accountName='',accessKeyId='', accessKey='') {
	login_user_id=0;
	login_cloud_account_id=0;
	const user = await firebase.auth().currentUser;
	const jBody = JSON.stringify({ "transactionType": "1","name":user.uid,"accountname":accountName,"accesskey":accessKey,"accesskeyid":accessKeyId });
	var res= await networkAPI.clouderAPI('CloudAccount',jBody)
	console.log('CloudAccount',res)
	if (res.responseCode==0) {
		let _json=JSON.parse(res.providerResponse.replaceAll("'","\""))
		login_user_id=_json.user_id;
		login_cloud_account_id=_json.cloud_account_id;
		await localStorage.setItem("login_user_id", login_user_id);
		await localStorage.setItem("login_cloud_account_id", login_cloud_account_id);
		console.log('login_user_id',login_user_id)
		console.log('login_cloud_account_id',login_cloud_account_id)
		refreshAWSConfigs(_menus);
	}
	else {
		console.log("Error:",res)
	}
}
function _validateAWSAccessKeyId(accessKeyId) {
	// TODO : Implement this. Currently, its only a null check.
	if (!accessKeyId) {
		return false;
	}
	return true;
}
function _validateAWSAccessKey(accessKey) {
	// TODO : Implement this. Currently, its only a null check.
	if (!accessKey) {
		return false;
	}
	return true;
}
function _validateAWSAccountName(accountName) {
	// TODO : Implement this. Currently, its only a null check.
	if (!accountName) {
		return false;
	}
	return true;
}

async function _saveAccountDetails(accessKeyId, accessKey, accountName) {
	// debugger;
	if (!_validateAWSAccountName(accountName)) {
		// showSnackbar("The AWS Access key doesn't seem to be quite right"); 
		displayError("The AWS Account Name doesn't seem to be quite right");
		return false;
	}
	if (!_validateAWSAccessKeyId(accessKeyId)) {
		// showSnackbar("Are you sure that's your AWS Access Key Id ?"); 
		// document.getElementById("error").innerHTML = "Are you sure that's your AWS Access Key Id ?";
		displayError("Are you sure that's your AWS Access Key Id ?");
		return false;
	}
	console.log("AWS Access key id is validated");
	if (!_validateAWSAccessKey(accessKey)) {
		// showSnackbar("The AWS Access key doesn't seem to be quite right"); 
		displayError("The AWS Access key doesn't seem to be quite right");
		return false;
	}

	console.log("AWS Access key is validated");

	// Now, the Access key id and key seems to be valid. Let's check if it works. 
	// If yes, save it, if no, slap the user.

	await _saveAccountDetailsToLocalStorage(accessKeyId, accessKey, accountName);
	// await _saveAccountDetailsToFirestore(accessKeyId, accessKey, accountName);
	await _saveAccountDetailsToDatabase(accountName,accessKeyId, accessKey);

	return true;
}

function triggerRefreshAWSConfig(ui, accessKeyId, accessKey, accountName) {
	console.log("Triggering refreshAWSConfigs event");
	ui.fireEvent(new mxEventObject('refreshAWSConfigs', 'keys', ['awsAccessKeyId', 'awsAccessKey', 'accountName'],
		'values', [accessKeyId, accessKey, accountName], 'cells', ""));
}

function displayError(text, seconds = 5) {
	var errorLabel = document.getElementById("error");
	errorLabel.style.display = "block";
	errorLabel.innerHTML = text;
	setTimeout(function () { errorLabel.innerHTML = ""; errorLabel.style.display = "none"; }, seconds * 1000);
}

var CloudAccountDialogold = function (ui, cell) {
	var div = document.createElement('div');

	var graph = ui.editor.graph;

	var value = graph.getModel().getValue(cell);

	// Converts the value to an XML node
	if (!mxUtils.isNode(value)) {
		var doc = mxUtils.createXmlDocument();
		var obj = doc.createElement('object');
		obj.setAttribute('label', value || '');
		value = obj;
	}

	// Creates the dialog contents
	var form = new mxForm('properties');
	form.table.style.width = '100%';

	var attrs = value.attributes;
	var names = [];
	var texts = [];
	var count = 0;

	// var id = (EditDataDialog.getDisplayIdForCell != null) ?
	// 	EditDataDialog.getDisplayIdForCell(ui, cell) : null;



	var addTextArea = function (index, name, value) {
		names[index] = name;
		texts[index] = form.addTextarea(names[count] + ':', value, 2);
		texts[index].style.width = '100%';

		// addRemoveButton(texts[index], name);
	};

	var temp = [];
	var isLayer = graph.getModel().getParent(cell) == graph.getModel().getRoot();

	for (var i = 0; i < attrs.length; i++) {
		if ((isLayer || attrs[i].nodeName != 'label') && attrs[i].nodeName != 'placeholders') {
			temp.push({ name: attrs[i].nodeName, value: attrs[i].nodeValue });
		}
	}

	// Sorts by name
	temp.sort(function (a, b) {
		if (a.name < b.name) {
			return -1;
		}
		else if (a.name > b.name) {
			return 1;
		}
		else {
			return 0;
		}
	});

	// if (id != null) {
	// 	var text = document.createElement('div');
	// 	text.style.width = '100%';
	// 	text.style.fontSize = '11px';
	// 	text.style.textAlign = 'center';
	// 	mxUtils.write(text, id);

	// 	form.addField(mxResources.get('id') + ':', text);
	// }

	for (var i = 0; i < temp.length; i++) {
		addTextArea(count, temp[i].name, temp[i].value);
		count++;
	}
	var top = document.createElement('div');

	top.setAttribute('align', 'center');

	var img = document.createElement('img');
	img.style.border = '0px';
	img.setAttribute('width', '130');
	img.setAttribute('width', '100');
	img.setAttribute('src', IMAGE_PATH + '/clouder/awslogo.png');
	top.appendChild(img);

	mxUtils.br(top);

	var h3 = document.createElement('h3');
	mxUtils.write(h3, mxResources.get('connectAWSAccount'));
	top.appendChild(h3);

	top.style.cssText = 'position:absolute;left:30px;right:30px;overflow-y:auto;top:10px;bottom:80px;';
	top.appendChild(form.table);


	var newProp = document.createElement('div');
	newProp.style.boxSizing = 'border-box';
	// newProp.style.paddingRight = '160px';
	newProp.setAttribute('align', 'left');
	// newProp.style.whiteSpace = 'nowrap';
	newProp.style.marginTop = '6px';
	newProp.style.width = '100%';

	// "AccessKeyId": "AKIA24BXXPAKSUWNNN53","AccessKey": "h5IixtCxQYaFq5dFDgA0AHLYLRbhhIzTr90YBslT"
	// var label = document.createElement('label');
	// label.innerHTML = "AWS Access Key Id : ";

	const labelForAWSAccountName = createCloudAccountTextboxLabel(mxResources.get('awsAccountName') + "    " + " : ");
	newProp.appendChild(labelForAWSAccountName);
	mxUtils.br(newProp);
	var awsAccountNameTextbox = createCloudAccountTextbox(_getAWSAccountNameFromLocalStorage() ?? '');

	newProp.appendChild(awsAccountNameTextbox);
	mxUtils.br(awsAccountNameTextbox);
	top.appendChild(newProp);
	mxUtils.br(newProp);
	mxUtils.br(newProp);


	const labelForAWSAccessKeyId = createCloudAccountTextboxLabel(mxResources.get('awsAccessKeyId') + "    " + " : ");
	newProp.appendChild(labelForAWSAccessKeyId);
	mxUtils.br(newProp);
	// var placeholderText = _getAWSAccessKeyIdFromLocalStorage()?"AWS Access Key Id:"+_getAWSAccessKeyIdFromLocalStorage():mxResources.get('awsAccessKeyId');
	// var awsAccessKeyIdTextbox = createCloudAccountTextbox(_getAWSAccessKeyIdFromLocalStorage()??mxResources.get('awsAccessKeyId'));
	var awsAccessKeyIdTextbox = createCloudAccountTextbox(_getAWSAccessKeyIdFromLocalStorage() ?? '');

	newProp.appendChild(awsAccessKeyIdTextbox);
	mxUtils.br(awsAccessKeyIdTextbox);
	top.appendChild(newProp);
	mxUtils.br(newProp);
	mxUtils.br(newProp);

	const labelForAWSAccessKey = createCloudAccountTextboxLabel(mxResources.get('awsSecretAccessKey') + " : ");
	newProp.appendChild(labelForAWSAccessKey);
	mxUtils.br(newProp);
	// var placeholderText = _getAWSAccessKeyFromLocalStorage()?"AWS Access Key:"+_getAWSAccessKeyIdFromLocalStorage():mxResources.get('awsAccessKeyId');
	// var awsAccessKeyTextbox = createCloudAccountTextbox(_getAWSAccessKeyFromLocalStorage()??mxResources.get('awsSecretAccessKey'));
	var awsAccessKeyTextbox = createCloudAccountTextbox(_getAWSAccessKeyFromLocalStorage() ?? '');

	newProp.appendChild(awsAccessKeyTextbox);

	top.appendChild(newProp);
	top.style.width = "90%"
	top.style.height = "100%"
	mxUtils.br(top);
	mxUtils.br(top);
	// mxUtils.br(top);

	var errorLabel = document.createElement('label');	// Just a provision. Will be used if validation is unsuccessful.
	errorLabel.setAttribute("id", "error");
	errorLabel.style.display = "none";
	top.appendChild(errorLabel);

	div.appendChild(top);

	this.init = function () {
		if (texts.length > 0) {
			texts[0].focus();
		}
		else {
			nameInput.focus();
		}
	};


	var cancelBtn = mxUtils.button(mxResources.get('cancel'), function () {
		ui.hideDialog.apply(ui, arguments);
	});

	cancelBtn.className = 'geBtn';



	var applyBtn = mxUtils.button(mxResources.get('apply'), async function () {
		try {
			// ui.hideDialog.apply(ui, arguments);
			// debugger;
			displayError("Please wait...")
			const accessKeyId = awsAccessKeyIdTextbox.value;
			const accessKey = awsAccessKeyTextbox.value;
			const accountName = awsAccountNameTextbox.value;
			var isSaveSuccessful = await _saveAccountDetails(accessKeyId, accessKey, accountName);

			if (isSaveSuccessful) {
				const network = new Network();
				const accessKeyId = localStorage.getItem("AccessKeyId");
				const accessKey = localStorage.getItem("AccessKey");

				const requestData = JSON.stringify({ "AccessKeyId": accessKeyId, "AccessKey": accessKey });
				// var data = await network.getRegions("aws", requestData);
				

				if (login_cloud_account_id == 0) {
					displayError("Invalid credentials...Please confirm")
					ui.hideDialog.apply(ui, arguments);
					ui.showDialog(new ConfirmationDialog(ui,null,mxResources.get('confirmationmsg1')).container, 400, 150, true, true, function () {
						showingAbout = false;
					});
				}
				else {
					const jBody = JSON.stringify({ "cloudUserId": login_user_id});
					let req=	await networkAPI.clouderAPI("GetIDs",jBody)
					displayError("Connection was successfully established with the AWS")
					console.log(req);
					 data = await network.createEC2StateEB("aws", requestData);
					ui.hideDialog.apply(ui, arguments);
					triggerRefreshAWSConfig(ui, accessKeyId, accessKey, accountName);
				}


			}
			// const jBody = JSON.stringify({ "AccessKeyId": "AKIA24BXXPAKSUWNNN53","AccessKey": "h5IixtCxQYaFq5dFDgA0AHLYLRbhhIzTr90YBslT" });
			// var values = []
			// console.log(accessKeyId," ",accessKey);
			// localStorage.setItem("AccessKeyId",accessKeyId);
			// localStorage.setItem("AccessKey",accessKey)
			// value = value.cloneNode(true);
			// var removeLabel = false;

			// ui.fireEvent(new mxEventObject('refreshAWSConfigs', 'keys', ['awsAccessKeyId','awsAccessKey'],
			// 'values', [accessKeyId,accessKey], 'cells', ""));
		}

		catch (e) {
			mxUtils.alert(e);
		}
	});

	applyBtn.className = 'geBtn gePrimaryBtn';

	var buttons = document.createElement('div');
	buttons.style.cssText = 'position:absolute;left:30px;right:30px;text-align:right;bottom:1px;height:40px;'

	if (ui.editor.graph.getModel().isVertex(cell) || ui.editor.graph.getModel().isEdge(cell)) {
		var replace = document.createElement('span');
		replace.style.marginRight = '10px';
		var input = document.createElement('input');
		input.setAttribute('type', 'checkbox');
		input.style.marginRight = '6px';

		if (value.getAttribute('placeholders') == '1') {
			input.setAttribute('checked', 'checked');
			input.defaultChecked = true;
		}

		mxEvent.addListener(input, 'click', function () {
			if (value.getAttribute('placeholders') == '1') {
				value.removeAttribute('placeholders');
			}
			else {
				value.setAttribute('placeholders', '1');
			}
		});

		replace.appendChild(input);
		mxUtils.write(replace, mxResources.get('placeholders'));

		if (EditDataDialog.placeholderHelpLink != null) {
			var link = document.createElement('a');
			link.setAttribute('href', EditDataDialog.placeholderHelpLink);
			link.setAttribute('title', mxResources.get('help'));
			link.setAttribute('target', '_blank');
			link.style.marginLeft = '8px';
			link.style.cursor = 'help';

			var icon = document.createElement('img');
			mxUtils.setOpacity(icon, 50);
			icon.style.height = '16px';
			icon.style.width = '16px';
			icon.setAttribute('border', '0');
			icon.setAttribute('valign', 'middle');
			icon.style.marginTop = (mxClient.IS_IE11) ? '0px' : '-4px';
			icon.setAttribute('src', Editor.helpImage);
			link.appendChild(icon);

			replace.appendChild(link);
		}

		buttons.appendChild(replace);
	}

	if (ui.editor.cancelFirst) {
		buttons.appendChild(cancelBtn);
		buttons.appendChild(applyBtn);
	}
	else {
		buttons.appendChild(applyBtn);
		buttons.appendChild(cancelBtn);
	}

	// mxUtils.br(buttons);
	// mxUtils.br(buttons);


	div.appendChild(buttons);

	this.container = div;
};
var CloudAccountDialog = function (ui, cell) {
	var div = document.createElement('div');

	var graph = ui.editor.graph;

	var value = graph.getModel().getValue(cell);

	// Converts the value to an XML node
	if (!mxUtils.isNode(value)) {
		var doc = mxUtils.createXmlDocument();
		var obj = doc.createElement('object');
		obj.setAttribute('label', value || '');
		value = obj;
	}

	// Creates the dialog contents
	var form = new mxForm('properties');
	form.table.style.width = '100%';

	var attrs = value.attributes;
	var names = [];
	var texts = [];
	var count = 0;

	// var id = (EditDataDialog.getDisplayIdForCell != null) ?
	// 	EditDataDialog.getDisplayIdForCell(ui, cell) : null;



	var addTextArea = function (index, name, value) {
		names[index] = name;
		texts[index] = form.addTextarea(names[count] + ':', value, 2);
		texts[index].style.width = '100%';

		// addRemoveButton(texts[index], name);
	};

	var temp = [];
	var isLayer = graph.getModel().getParent(cell) == graph.getModel().getRoot();

	for (var i = 0; i < attrs.length; i++) {
		if ((isLayer || attrs[i].nodeName != 'label') && attrs[i].nodeName != 'placeholders') {
			temp.push({ name: attrs[i].nodeName, value: attrs[i].nodeValue });
		}
	}

	// Sorts by name
	temp.sort(function (a, b) {
		if (a.name < b.name) {
			return -1;
		}
		else if (a.name > b.name) {
			return 1;
		}
		else {
			return 0;
		}
	});

	// if (id != null) {
	// 	var text = document.createElement('div');
	// 	text.style.width = '100%';
	// 	text.style.fontSize = '11px';
	// 	text.style.textAlign = 'center';
	// 	mxUtils.write(text, id);

	// 	form.addField(mxResources.get('id') + ':', text);
	// }

	for (var i = 0; i < temp.length; i++) {
		addTextArea(count, temp[i].name, temp[i].value);
		count++;
	}
	var top = document.createElement('div');

	top.setAttribute('align', 'center');

	var img = document.createElement('img');
	img.style.border = '0px';
	img.setAttribute('width', '130');
	img.setAttribute('width', '100');
	img.setAttribute('src', IMAGE_PATH + '/clouder/awslogo.png');
	top.appendChild(img);

	mxUtils.br(top);

	var h3 = document.createElement('h3');
	mxUtils.write(h3, mxResources.get('connectAWSAccount'));
	top.appendChild(h3);

	top.style.cssText = 'position:absolute;left:30px;right:30px;overflow-y:auto;top:10px;bottom:80px;';
	top.appendChild(form.table);


	var newProp = document.createElement('div');
	newProp.style.boxSizing = 'border-box';
	// newProp.style.paddingRight = '160px';
	newProp.setAttribute('align', 'left');
	// newProp.style.whiteSpace = 'nowrap';
	newProp.style.marginTop = '6px';
	newProp.style.width = '100%';
	newProp.innerHTML=cloud_accounts_html;
	mxUtils.br(newProp);
	
	top.appendChild(newProp);
	top.style.width = "90%"
	top.style.height = "100%"
	mxUtils.br(top);
	mxUtils.br(top);
	// mxUtils.br(top);

	var errorLabel = document.createElement('label');	// Just a provision. Will be used if validation is unsuccessful.
	errorLabel.setAttribute("id", "error");
	errorLabel.style.display = "none";
	top.appendChild(errorLabel);

	div.appendChild(top);

	this.init = function () {
		if (texts.length > 0) {
			texts[0].focus();
		}
		else {
			nameInput.focus();
		}
	};

	
	if (ui.editor.graph.getModel().isVertex(cell) || ui.editor.graph.getModel().isEdge(cell)) {
		var replace = document.createElement('span');
		replace.style.marginRight = '10px';
		var input = document.createElement('input');
		input.setAttribute('type', 'checkbox');
		input.style.marginRight = '6px';

		if (value.getAttribute('placeholders') == '1') {
			input.setAttribute('checked', 'checked');
			input.defaultChecked = true;
		}

		mxEvent.addListener(input, 'click', function () {
			if (value.getAttribute('placeholders') == '1') {
				value.removeAttribute('placeholders');
			}
			else {
				value.setAttribute('placeholders', '1');
			}
		});

		replace.appendChild(input);
		mxUtils.write(replace, mxResources.get('placeholders'));

		if (EditDataDialog.placeholderHelpLink != null) {
			var link = document.createElement('a');
			link.setAttribute('href', EditDataDialog.placeholderHelpLink);
			link.setAttribute('title', mxResources.get('help'));
			link.setAttribute('target', '_blank');
			link.style.marginLeft = '8px';
			link.style.cursor = 'help';

			var icon = document.createElement('img');
			mxUtils.setOpacity(icon, 50);
			icon.style.height = '16px';
			icon.style.width = '16px';
			icon.setAttribute('border', '0');
			icon.setAttribute('valign', 'middle');
			icon.style.marginTop = (mxClient.IS_IE11) ? '0px' : '-4px';
			icon.setAttribute('src', Editor.helpImage);
			link.appendChild(icon);

			replace.appendChild(link);
		}

		buttons.appendChild(replace);
	}

	this.container = div;
	
};
var ConfirmationDialog = function (ui, cell,dialogMsg,type='connectAWS') {
	var div = document.createElement('div');

	var graph = ui.editor.graph;

	var value = graph.getModel().getValue(cell);
	// console.log('cell',cell)
	// debugger
	// Converts the value to an XML node
	if (!mxUtils.isNode(value)) {
		var doc = mxUtils.createXmlDocument();
		var obj = doc.createElement('object');
		obj.setAttribute('label', value || '');
		value = obj;
	}

	// Creates the dialog contents
	var form = new mxForm('properties');
	form.table.style.width = '100%';

	var attrs = value.attributes;
	var names = [];
	var texts = [];
	var count = 0;

	// var id = (EditDataDialog.getDisplayIdForCell != null) ?
	// 	EditDataDialog.getDisplayIdForCell(ui, cell) : null;



	var addTextArea = function (index, name, value) {
		names[index] = name;
		texts[index] = form.addTextarea(names[count] + ':', value, 2);
		texts[index].style.width = '100%';

		// addRemoveButton(texts[index], name);
	};

	var temp = [];
	var isLayer = graph.getModel().getParent(cell) == graph.getModel().getRoot();

	for (var i = 0; i < attrs.length; i++) {
		if ((isLayer || attrs[i].nodeName != 'label') && attrs[i].nodeName != 'placeholders') {
			temp.push({ name: attrs[i].nodeName, value: attrs[i].nodeValue });
		}
	}

	// Sorts by name
	temp.sort(function (a, b) {
		if (a.name < b.name) {
			return -1;
		}
		else if (a.name > b.name) {
			return 1;
		}
		else {
			return 0;
		}
	});

	// if (id != null) {
	// 	var text = document.createElement('div');
	// 	text.style.width = '100%';
	// 	text.style.fontSize = '11px';
	// 	text.style.textAlign = 'center';
	// 	mxUtils.write(text, id);

	// 	form.addField(mxResources.get('id') + ':', text);
	// }

	for (var i = 0; i < temp.length; i++) {
		addTextArea(count, temp[i].name, temp[i].value);
		count++;
	}
	var top = document.createElement('div');

	top.setAttribute('align', 'center');

	var img = document.createElement('img');
	img.style.border = '0px';
	img.setAttribute('width', '130');
	img.setAttribute('width', '100');
	img.setAttribute('src', IMAGE_PATH + '/clouder/awslogo.png');
	top.appendChild(img);

	mxUtils.br(top);

	var h3 = document.createElement('h3');
	mxUtils.write(h3, mxResources.get('confirmation'));
	top.appendChild(h3);

	top.style.cssText = 'position:absolute;left:30px;right:30px;overflow-y:auto;top:10px;bottom:80px;';
	top.appendChild(form.table);


	var newProp = document.createElement('div');
	newProp.style.boxSizing = 'border-box';
	// newProp.style.paddingRight = '160px';
	newProp.setAttribute('align', 'left');
	// newProp.style.whiteSpace = 'nowrap';
	newProp.style.marginTop = '6px';
	newProp.style.width = '100%';


	const labelForAWSAccountName = createCloudAccountTextboxLabel(dialogMsg + " ");
	newProp.appendChild(labelForAWSAccountName);
	mxUtils.br(newProp);
	mxUtils.br(newProp);
	top.appendChild(newProp);
	top.style.width = "90%"
	top.style.height = "100%"
	mxUtils.br(top);
	mxUtils.br(top);
	// mxUtils.br(top);

	var errorLabel = document.createElement('label');	// Just a provision. Will be used if validation is unsuccessful.
	errorLabel.setAttribute("id", "error");
	errorLabel.style.display = "none";
	top.appendChild(errorLabel);

	div.appendChild(top);

	this.init = function () {
		if (texts.length > 0) {
			texts[0].focus();
		}
		else {
			nameInput.focus();
		}
	};



	var yesBtn = mxUtils.button(mxResources.get('yes'), function () {
		ui.hideDialog.apply(ui, arguments);
		try {
			switch (type) {
				case 'connectAWS':
					ui.showDialog(new CloudAccountDialog(ui).container, 400, 250, true, true, function () {
						showingAbout = false;
					});	
					accountTable();	
					break;
				case 'monitoring':
					MonitoringChange(true)	
					break;
			
				default:
					break;
			}
			
		}

		catch (e) {
			mxUtils.alert(e);
		}
	});

	yesBtn.className = 'geBtn gePrimaryBtn';

	var noBtn = mxUtils.button(mxResources.get('no'), function () {
		switch (type) {
			case 'connectAWS':
				
				break;
			case 'monitoring':
				MonitoringChange(false)	
				break;
		
			default:
				break;
			}
		ui.hideDialog.apply(ui, arguments);
	});

	noBtn.className = 'geBtn';


	var buttons = document.createElement('div');
	buttons.style.cssText = 'position:absolute;left:30px;right:30px;text-align:right;bottom:1px;height:40px;'


	if (ui.editor.cancelFirst) {
		buttons.appendChild(yesBtn);
		buttons.appendChild(noBtn);
	}
	else {
		buttons.appendChild(yesBtn);
		buttons.appendChild(noBtn);
	}

	// mxUtils.br(buttons);
	// mxUtils.br(buttons);


	div.appendChild(buttons);

	this.container = div;
};
var ShowResponseDialog = function (ui, cell,dialogMsg) {
	var div = document.createElement('div');

	var graph = ui.editor.graph;

	var value = graph.getModel().getValue(cell);
	// console.log('cell',cell)
	// debugger
	// Converts the value to an XML node
	if (!mxUtils.isNode(value)) {
		var doc = mxUtils.createXmlDocument();
		var obj = doc.createElement('object');
		obj.setAttribute('label', value || '');
		value = obj;
	}

	// Creates the dialog contents
	var form = new mxForm('properties');
	form.table.style.width = '100%';

	var attrs = value.attributes;
	var names = [];
	var texts = [];
	var count = 0;

	// var id = (EditDataDialog.getDisplayIdForCell != null) ?
	// 	EditDataDialog.getDisplayIdForCell(ui, cell) : null;



	var addTextArea = function (index, name, value) {
		names[index] = name;
		texts[index] = form.addTextarea(names[count] + ':', value, 2);
		texts[index].style.width = '100%';

		// addRemoveButton(texts[index], name);
	};

	var temp = [];
	var isLayer = graph.getModel().getParent(cell) == graph.getModel().getRoot();

	for (var i = 0; i < attrs.length; i++) {
		if ((isLayer || attrs[i].nodeName != 'label') && attrs[i].nodeName != 'placeholders') {
			temp.push({ name: attrs[i].nodeName, value: attrs[i].nodeValue });
		}
	}

	// Sorts by name
	temp.sort(function (a, b) {
		if (a.name < b.name) {
			return -1;
		}
		else if (a.name > b.name) {
			return 1;
		}
		else {
			return 0;
		}
	});

	// if (id != null) {
	// 	var text = document.createElement('div');
	// 	text.style.width = '100%';
	// 	text.style.fontSize = '11px';
	// 	text.style.textAlign = 'center';
	// 	mxUtils.write(text, id);

	// 	form.addField(mxResources.get('id') + ':', text);
	// }

	for (var i = 0; i < temp.length; i++) {
		addTextArea(count, temp[i].name, temp[i].value);
		count++;
	}
	var top = document.createElement('div');

	top.setAttribute('align', 'center');

	var img = document.createElement('img');
	img.style.border = '0px';
	img.setAttribute('width', '130');
	img.setAttribute('width', '100');
	img.setAttribute('src', IMAGE_PATH + '/clouder/awslogo.png');
	top.appendChild(img);

	mxUtils.br(top);

	var h3 = document.createElement('h3');
	mxUtils.write(h3, 'Deploy to AWS Log');
	top.appendChild(h3);

	top.style.cssText = 'position:absolute;left:30px;right:30px;overflow-y:auto;top:10px;bottom:80px;';
	top.appendChild(form.table);


	var newProp = document.createElement('div');
	newProp.style.boxSizing = 'border-box';
	// newProp.style.paddingRight = '160px';
	newProp.setAttribute('align', 'left');
	// newProp.style.whiteSpace = 'nowrap';
	newProp.style.marginTop = '6px';
	newProp.style.width = '100%';


	const labelForAWSAccountName = createCloudAccountTextboxLabel(dialogMsg + " ");
	newProp.appendChild(labelForAWSAccountName);
	mxUtils.br(newProp);
	mxUtils.br(newProp);
	top.appendChild(newProp);
	top.style.width = "90%"
	top.style.height = "100%"
	mxUtils.br(top);
	mxUtils.br(top);
	// mxUtils.br(top);

	var errorLabel = document.createElement('label');	// Just a provision. Will be used if validation is unsuccessful.
	errorLabel.setAttribute("id", "error");
	errorLabel.style.display = "none";
	top.appendChild(errorLabel);

	div.appendChild(top);

	this.init = function () {
		if (texts.length > 0) {
			texts[0].focus();
		}
		else {
			nameInput.focus();
		}
	};



	var yesBtn = mxUtils.button(mxResources.get('ok'), function () {
		ui.hideDialog.apply(ui, arguments);
		try {
			ui.hideDialog.apply(ui, arguments);
		}

		catch (e) {
			mxUtils.alert(e);
		}
	});

	yesBtn.className = 'geBtn gePrimaryBtn';

	


	var buttons = document.createElement('div');
	buttons.style.cssText = 'position:absolute;left:30px;right:30px;text-align:right;bottom:1px;height:40px;'


	if (ui.editor.cancelFirst) {
		buttons.appendChild(yesBtn);
	}
	else {
		buttons.appendChild(yesBtn);
	}

	// mxUtils.br(buttons);
	// mxUtils.br(buttons);


	div.appendChild(buttons);

	this.container = div;
};
var SignInConfirmationDialog = function (ui, cell) {
	var div = document.createElement('div');

	var graph = ui.editor.graph;

	var value = graph.getModel().getValue(cell);
	// debugger
	// Converts the value to an XML node
	if (!mxUtils.isNode(value)) {
		var doc = mxUtils.createXmlDocument();
		var obj = doc.createElement('object');
		obj.setAttribute('label', value || '');
		value = obj;
	}

	// Creates the dialog contents
	var form = new mxForm('properties');
	form.table.style.width = '100%';

	var attrs = value.attributes;
	var names = [];
	var texts = [];
	var count = 0;

	// var id = (EditDataDialog.getDisplayIdForCell != null) ?
	// 	EditDataDialog.getDisplayIdForCell(ui, cell) : null;



	var addTextArea = function (index, name, value) {
		names[index] = name;
		texts[index] = form.addTextarea(names[count] + ':', value, 2);
		texts[index].style.width = '100%';

		// addRemoveButton(texts[index], name);
	};

	var temp = [];
	var isLayer = graph.getModel().getParent(cell) == graph.getModel().getRoot();

	for (var i = 0; i < attrs.length; i++) {
		if ((isLayer || attrs[i].nodeName != 'label') && attrs[i].nodeName != 'placeholders') {
			temp.push({ name: attrs[i].nodeName, value: attrs[i].nodeValue });
		}
	}

	// Sorts by name
	temp.sort(function (a, b) {
		if (a.name < b.name) {
			return -1;
		}
		else if (a.name > b.name) {
			return 1;
		}
		else {
			return 0;
		}
	});

	// if (id != null) {
	// 	var text = document.createElement('div');
	// 	text.style.width = '100%';
	// 	text.style.fontSize = '11px';
	// 	text.style.textAlign = 'center';
	// 	mxUtils.write(text, id);

	// 	form.addField(mxResources.get('id') + ':', text);
	// }

	for (var i = 0; i < temp.length; i++) {
		addTextArea(count, temp[i].name, temp[i].value);
		count++;
	}
	var top = document.createElement('div');

	top.setAttribute('align', 'center');

	var img = document.createElement('img');
	img.style.border = '0px';
	img.setAttribute('width', '130');
	img.setAttribute('width', '100');
	img.setAttribute('src', IMAGE_PATH + '/clouder/awslogo.png');
	top.appendChild(img);

	mxUtils.br(top);

	var h3 = document.createElement('h3');
	mxUtils.write(h3, mxResources.get('confirmation'));
	top.appendChild(h3);

	top.style.cssText = 'position:absolute;left:30px;right:30px;overflow-y:auto;top:10px;bottom:80px;';
	top.appendChild(form.table);


	var newProp = document.createElement('div');
	newProp.style.boxSizing = 'border-box';
	// newProp.style.paddingRight = '160px';
	newProp.setAttribute('align', 'left');
	// newProp.style.whiteSpace = 'nowrap';
	newProp.style.marginTop = '6px';
	newProp.style.width = '100%';


	const labelForAWSAccountName = createCloudAccountTextboxLabel(mxResources.get('confirmationmsg2') + " ");
	newProp.appendChild(labelForAWSAccountName);
	mxUtils.br(newProp);
	mxUtils.br(newProp);
	top.appendChild(newProp);
	top.style.width = "90%"
	top.style.height = "100%"
	mxUtils.br(top);
	mxUtils.br(top);
	// mxUtils.br(top);

	var errorLabel = document.createElement('label');	// Just a provision. Will be used if validation is unsuccessful.
	errorLabel.setAttribute("id", "error");
	errorLabel.style.display = "none";
	top.appendChild(errorLabel);

	div.appendChild(top);

	this.init = function () {
		if (texts.length > 0) {
			texts[0].focus();
		}
		else {
			nameInput.focus();
		}
	};



	var yesBtn = mxUtils.button(mxResources.get('yes'), function () {
		ui.hideDialog.apply(ui, arguments);
		try {
			var user = firebase.auth().currentUser;
			if (user == null) {
				// onGoogleSignIn();
				ui.showDialog(new SignInDialog(ui).container, 400, 350, true, true, function () {
					showingAbout = false;
				});
				return;
			}
			else {
				showSnackbar("Did you forget ? You are already logged in :)");
			}
		}

		catch (e) {
			mxUtils.alert(e);
		}
	});

	yesBtn.className = 'geBtn gePrimaryBtn';

	var noBtn = mxUtils.button(mxResources.get('no'), function () {
		ui.hideDialog.apply(ui, arguments);
	});

	noBtn.className = 'geBtn';


	var buttons = document.createElement('div');
	buttons.style.cssText = 'position:absolute;left:30px;right:30px;text-align:right;bottom:1px;height:40px;'


	if (ui.editor.cancelFirst) {
		buttons.appendChild(yesBtn);
		buttons.appendChild(noBtn);
	}
	else {
		buttons.appendChild(yesBtn);
		buttons.appendChild(noBtn);
	}

	// mxUtils.br(buttons);
	// mxUtils.br(buttons);


	div.appendChild(buttons);

	this.container = div;
};