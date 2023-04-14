
var socket = io();
console.log("receiveing...2");
socket.on('ec2status', function (msg) {
    console.log("receiveing...", msg);
    const _status = JSON.parse(msg);
    if (!IsLiveMonitoringStart) {
        return;
    }
    StartMonitoring(_status)
});
function StartMonitoring(_status) {
    _cells=_editorUi.editor.graph.model.cells;
    if (_status['source'] == 'aws.ec2') {
        for (var key in _cells) {
            let _cell = _cells[key];
            let _style=_cell.style;
            if (_style != null && _style.includes(_shape_ec2)) {
                if (_cell.getAttribute(ec2_id) == _status['detail']['instance-id']) {
                    let styleElement = _style.split(';').filter(element => element.includes('fillColor'));
                    if (styleElement.length > 0) {
                        _style = _style.replace(styleElement[0], GetStatusColorEC2(_status['detail']['state']))
                        _editorUi.editor.graph.model.beginUpdate();
                        _graph.getModel().setStyle(_cell, _style);
                        _editorUi.editor.graph.model.endUpdate();
                        ShowSnackBar(_status['source'] + ' : ' + _status['detail']['instance-id'] + ' | State: ' + _status['detail']['state'])
                    }
                }
            }
        }


        // for (let i = 0; i < arr.length; i++) {
        //     if (arr[i].includes(' ec2_id="' + _status['detail']['instance-id'] + '"') && arr[i].includes('<object')) {
        //         let styleElement = arr[i + 1];
        //         let styleElement = styleElement.split(';').filter(element => element.includes('fillColor'));
        //         if (styleElement.length > 0) {
        //             // console.log(styleElement);
        //             styleElement = styleElement.replace(styleElement[0], GetStatusColorEC2(_status['detail']['state']))
        //             arr[i + 1] = styleElement;
        //             ShowSnackBar(_status['source'] + ' : ' + _status['detail']['instance-id'] + ' | State: ' + _status['detail']['state'])
        //         }
        //     }
        //     _diaXML2 = _diaXML2 + '\n' + arr[i];
        // }
        // serverResponse(_diaXML2);
    }
    if (_status['source'] == 'aws.rds') {
        for (var key in _cells) {
            let _cell = _cells[key];
            let _style=_cell.style;
            if ( _style!= null && _style.includes(_shape_rds)) {
                if (_cell.getAttribute(rds_id) ==  _status['detail']['SourceIdentifier']) {
                    let styleElement = _style.split(';').filter(element => element.includes('fillColor'));
                    if (styleElement.length > 0) {
                        console.log(_style)
                        _style = _style.replace(styleElement[0], GetStatusColorRDS(_status['detail']['Message']))
                        _editorUi.editor.graph.model.beginUpdate();
                        console.log(_style)
                        console.log(_cell)

                        _graph.getModel().setStyle(_cell, _style);
                        _editorUi.editor.graph.model.endUpdate();
                        ShowSnackBar(_status['source'] + ' : ' + _status['detail']['SourceIdentifier'] + ' | Message: ' + _status['detail']['Message'])
                    }
                }
            }
        }
        // for (let i = 0; i < arr.length; i++) {
        //     if (arr[i].includes(' rds_id="' + _status['detail']['SourceIdentifier'] + '"') && arr[i].includes('<object')) {
        //         let styleElement = arr[i + 1];
        //         let styleElement = styleElement.split(';').filter(element => element.includes('fillColor'));
        //         if (styleElement.length > 0) {
        //             // console.log(styleElement);
        //             styleElement = styleElement.replace(styleElement[0], GetStatusColorRDS(_status['detail']['Message']))
        //             arr[i + 1] = styleElement;
        //             ShowSnackBar(_status['source'] + ' : ' + _status['detail']['SourceIdentifier'] + ' | Message: ' + _status['detail']['Message'])
        //         }
        //     }
        //     _diaXML2 = _diaXML2 + '\n' + arr[i];
        // }
        // serverResponse(_diaXML2);
    }
}
function serverResponse(data) {
    _editorUi.editor.graph.model.beginUpdate();
    _editorUi.editor.setGraphXml(mxUtils.parseXml(data).documentElement);
    _editorUi.editor.graph.model.endUpdate();
    // ShowSnackBar('Updated...')
}
function GetStatusColorEC2(status) {
    console.log(status)
    switch (status.toLowerCase()) {
        case 'pending': return 'fillColor=#FFFF00'
        case 'running': return 'fillColor=#00FF00'
        case 'shutting-down': return 'fillColor=#FFA500'
        case 'terminated': return 'fillColor=#FF0000'
        case 'stopping': return 'fillColor=#ffae42'
        case 'stopped': return 'fillColor=#808080'
        default: return 'fillColor=#F58534';
    }
}
function GetStatusColorRDS(status) {
    if (status.toLowerCase().includes('stopped')) {
        return 'fillColor=#808080'
    }
    else if (status.toLowerCase().includes('started')) {
        return 'fillColor=#00FF00'
    }
    else {
        return 'fillColor=#2E73B8'
    }
}
function ShowSnackBar(txtMSG) {
    var x = document.getElementById("snackbar");
    x.innerHTML = txtMSG;
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

async function MonitoringChange(IsOn = null) {
    var checkbox = document.getElementById("monitoring");

    if (IsOn != null) {
        if (IsOn) {
            checkbox.checked = true;
        } else {
            checkbox.checked = false;
        }
    }
    else {
        // const accessKeyId = localStorage.getItem("AccessKeyId");
        // const accessKey = localStorage.getItem("AccessKey");

        // const requestData = JSON.stringify({ "AccessKeyId": accessKeyId, "AccessKey": accessKey });
        if (login_cloud_account_id != 0) {
            ec2_ids = await networkAPI.getEC2();
            rds_ids = await networkAPI.getRDS();
        }

    }
    if (checkbox.checked) {
        IsLiveMonitoringStart = true;
        console.log("Monitoring enabled");
        if (ec2_details != null) {
            for (let i = 0; i < ec2_details.length; i++) {
                const element = ec2_details[i];
                const _status = JSON.parse(`{
                                                "version": "0",
                                                "id": "",
                                                "detail-type": "EC2 Instance State-change Notification",
                                                "source": "aws.ec2",
                                                "account": "",
                                                "time": "",
                                                "region": "",
                                                "resources": [
                                                    ""
                                                ],
                                                "detail": {
                                                    "instance-id": "`+ element.objectID + `",
                                                    "state": "`+ element.State + `"
                                                }
                                            }`);
                StartMonitoring(_status)
            }
        }
        if (rds_details != null) {
            for (let i = 0; i < rds_details.length; i++) {
                const element = rds_details[i];
                const _status = JSON.parse(`{
                                                "version": "0",
                                                "id": "",
                                                "detail-type": "RDS DB Instance Event",
                                                "source": "aws.rds",
                                                "account": "",
                                                "time": "",
                                                "region": "",
                                                "resources": [
                                                    ""
                                                ],
                                                "detail": {
                                                    "EventCategories": [
                                                        "notification"
                                                    ],
                                                    "SourceType": "DB_INSTANCE",
                                                    "SourceArn": "",
                                                    "Date": "",
                                                    "Message": "`+ element.DBInstanceStatus + `",
                                                    "SourceIdentifier": "`+ element.objectID + `",
                                                    "EventID": "RDS-EVENT-0088"
                                                }
                                            }`);
                StartMonitoring(_status)
            }
        }

    } else {
        IsLiveMonitoringStart = false;
        console.log("Monitoring disabled");
    }
}


