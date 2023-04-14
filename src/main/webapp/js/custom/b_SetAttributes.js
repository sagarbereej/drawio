ArrangePanel.prototype.setAttributes = function (currentShape) {
	switch (currentShape) {
		case _shape_cloud:
			this.container.appendChild(this.addAWSAccount(this.createPanel()));
			break;
		case _shape_az:
			this.container.appendChild(this.addAZ(this.createPanel()));
			break;
		case _shape_subnet:
			this.container.appendChild(this.addSubnet(this.createPanel()));
			break;
		case _shape_sg:
			this.container.appendChild(this.addSG(this.createPanel()));
			break;
		case _shape_region:
			this.container.appendChild(this.addRegion(this.createPanel()));
			break;
		case _shape_vpc:
			this.container.appendChild(this.addVPC(this.createPanel()));
			break;
		case _shape_ec2:
			this.container.appendChild(this.addEC2(this.createPanel()));
			break;
		case _shape_elb:
			this.container.appendChild(this.addELB(this.createPanel()));
			break;
		case _shape_rds:
			this.container.appendChild(this.addRDS(this.createPanel()));
			break;
		default:
			break;
	}
}


function createTextbox(bing, title, property, width, IsStepper = true, IsPassword = false) {
	var textBox = bing.createClouderTextbox(bing, title, property, width, null, null, IsStepper, IsPassword);
	textBox.style.paddingTop = '8px';
	textBox.style.paddingBottom = '8px';
	return textBox;
}

BaseFormatPanel.prototype.addCidr = function (container, unit, right, width, update, step, marginTop, disableFocus, isFloat) {
	marginTop = (marginTop != null) ? marginTop : 0;
	debugger;

	var input = document.createElement('input');
	input.style.position = 'absolute';
	input.style.textAlign = 'right';
	input.style.marginTop = '-2px';
	input.style.right = (right + 12) + 'px';
	input.style.width = width + 'px';
	container.appendChild(input);

	var stepper = this.createStepper(input, update, step, null, disableFocus, null, isFloat);
	stepper.style.marginTop = (marginTop - 2) + 'px';
	stepper.style.right = right + 'px';
	container.appendChild(stepper);

	return input;
};

BaseFormatPanel.prototype.createClouderTextbox = function (bing, label, key, width, handler, init, IsStepper = true, IsPassword = false) {
	width = (width != null) ? width : 44;

	var graph = this.editorUi.editor.graph;

	// debugger;


	var div = this.createPanel();
	div.style.paddingTop = '10px';
	div.style.paddingBottom = '10px';
	mxUtils.write(div, label);
	div.style.fontWeight = 'bold';

	var update = mxUtils.bind(bing, function (evt) {
		// debugger;



		if (handler != null) {
			handler(input);
		}
		else {
			AutoFill(graph.getSelectionCells(), [key], [input.value], false);
			this.editorUi.fireEvent(new mxEventObject('styleChanged', 'keys', [key],
				'values', [input.value], 'cells', graph.getSelectionCells()));
			// var x = document.getElementById("snackbar");
			// x.innerHTML = 'Property is set to "'+input.value+'"';
			// // After 3 seconds, remove the show class from DIV
			// x.className = "show";
			// setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);

		}

		mxEvent.consume(evt);
	});
	//container, unit, right, width, update, step, marginTop, disableFocus, isFloat,IsStepper=true
	var input = this.b_addUnitInput(div, '', 20, width, update, 10, -15, handler != null, null, IsStepper, IsPassword);


	// The property can be very well set without the following if condition. However, for some reason following happens when the code is commented.
	// If user types something in the textbox then property is set however, upon pressing [Enter], the focus is not changed i.e.
	// the cursor remains in the textbox. Then user wouldn't know if the property is set or not.



	if (key != null) {


		var listener = mxUtils.bind(this, function (sender, evt, force) {

			var ss = _editorUi.getSelectionState()
			if (ss.vertices != null) {
				
				var value = ss.vertices[0]==undefined?null: ss.vertices[0].getAttribute(key);

				if (value != null) {
					input.value = value;
				}
				else {
					input.value = '';
				}

			}


			// if (force || input != document.activeElement)
			// {

			// 	var ss = this.format.getSelectionState();
			// 	var v = mxUtils.getValue(ss.style, key, 100);
			// 	var tmp = parseInt(v);

			// 	// input.value = (isNaN(tmp)) ? '' : tmp;

			// 	// this.editorUi.fireEvent(new mxEventObject('styleChanged', 'keys', [key],
			// 	// 	'values', [input.value], 'cells', graph.getSelectionCells()));

			// }
		});

		mxEvent.addListener(input, 'keydown', function (e) {
			if (e.keyCode == 13) {
				graph.container.focus();
				mxEvent.consume(e);
			}
			else if (e.keyCode == 27) {
				listener(null, null, true);
				graph.container.focus();
				mxEvent.consume(e);
			}
		});

		graph.getModel().addListener(mxEvent.CHANGE, listener);
		bing.listeners.push({ destroy: function () { graph.getModel().removeListener(listener); } });
		listener();
	}

	// mxEvent.addListener(input, 'blur', update);

	mxEvent.addListener(input, 'change', update);

	if (init != null) {
		init(input);
	}

	return div;
};
BaseFormatPanel.prototype.b_addUnitInput = function (container, unit, right, width, update, step, marginTop, disableFocus, isFloat, IsStepper = true, IsPassword = false) {
	marginTop = (marginTop != null) ? marginTop : 0;

	var input = document.createElement('input');
	input.style.position = 'absolute';
	input.style.textAlign = 'right';
	input.style.marginTop = '-2px';
	input.style.right = (right + 12) + 'px';
	input.style.width = width + 'px';
	if (IsPassword) {
		input.type = 'password'
	}
	container.appendChild(input);
	if (IsStepper) {
		var stepper = this.createStepper(input, update, step, null, disableFocus, null, isFloat);
		stepper.style.marginTop = (marginTop - 2) + 'px';
		stepper.style.right = right + 'px';
		container.appendChild(stepper);
	}

	return input;
};

function setStylePanelAttribs(stylePanel) {
	stylePanel.style.paddingTop = '2px';
	stylePanel.style.paddingBottom = '2px';
	stylePanel.style.position = 'relative';
	stylePanel.style.marginLeft = '-2px';
	stylePanel.style.borderWidth = '0px';
	stylePanel.className = 'geToolbarContainer';
	return stylePanel;
}
function setTitleAttribs(title) {

	title.style.paddingLeft = '18px';
	title.style.paddingTop = '10px';
	title.style.paddingBottom = '6px';
	return title;
}

function setCSSMenuAttribs(cssMenu) {
	cssMenu.style.color = 'rgb(112, 112, 112)';
	vpc_cssMenu.style.whiteSpace = 'nowrap';
	cssMenu.style.overflow = 'hidden';
	cssMenu.style.margin = '0px';
	cssMenu.style.width = '192px';
	cssMenu.style.height = '15px';
	return cssMenu;
}

function setFontMenuAttribs(fontMenu) {

}

ArrangePanel.prototype.addEC2 = function (container) {
	var ui = this.editorUi;
	this.container = this.bingoAdd(this, ui, container, ec2_id, [], true)
	this.container = this.bingoAdd(this, ui, container, ec2_ami_id, [], true)
	this.container = this.bingoAdd(this, ui, container, ec2_instance_type, [], true, 't2.small')
	this.container = this.bingoAdd(this, ui, container, ec2_sg_id, [], true)
	this.container = this.bingoAdd(this, ui, container, ec2_subnet_id, [], true)
	this.container = this.bingoAdd(this, ui, container, ec2_key_id, [], true)
	this.container.appendChild(createTextbox(this, mxResources.get(ec2_key_name), ec2_key_name, 90, false));
	this.container.appendChild(createTextbox(this, mxResources.get(ec2_tag_key), ec2_tag_key, 90, false));
	this.container.appendChild(createTextbox(this, mxResources.get(ec2_tag_value), ec2_tag_value, 90, false));
	this.container.appendChild(createTextbox(this, mxResources.get(ec2_user_data), ec2_user_data, 90, false));

	return container;
};
ArrangePanel.prototype.addRDS = function (container) {
	var ui = this.editorUi;
	this.container = this.bingoAdd(this, ui, container, rds_id, [], true)
	this.container = this.bingoAdd(this, ui, container, rds_engine, [], true, 'MySQL')
	this.container = this.bingoAdd(this, ui, container, rds_instance_class, [], true, 'db.t2.micro')
	this.container.appendChild(createTextbox(this, mxResources.get(rds_name), rds_name, 90, false));
	this.container.appendChild(createTextbox(this, mxResources.get(rds_username), rds_username, 90, false));
	this.container.appendChild(createTextbox(this, mxResources.get(rds_password), rds_password, 90, false, true));
	this.container.appendChild(createTextbox(this, mxResources.get(rds_instance_id), rds_instance_id, 90, false));
	this.container.appendChild(createTextbox(this, mxResources.get(rds_allocated_storage), rds_allocated_storage, 50, true));

	return container;
};



ArrangePanel.prototype.addVPC = function (container) {


	var ui = this.editorUi;

	this.container = this.bingoAdd(this, ui, container, vpc_id, Menus.prototype.defaultVPC, true)
	this.container = this.bingoAdd(this, ui, container, vpc_region_id, Menus.prototype.defaulRegion, true, default_region)
	this.container.appendChild(createTextbox(this, mxResources.get(vpc_cidr_block), vpc_cidr_block, 100, false));

	return container;

};

ArrangePanel.prototype.addSG = function (container) {
	var ui = this.editorUi;
	this.container = this.bingoAdd(this, ui, container, sg_id, [], true);
	this.container = this.bingoAdd(this, ui, container, sg_region_id, [], true, default_region);
	this.container = this.bingoAdd(this, ui, container, sg_vpc_id, [], true);
	this.container.appendChild(createTextbox(this, mxResources.get(sg_group_name), sg_group_name, 90, false));
	this.container.appendChild(createTextbox(this, mxResources.get(sg_description), sg_description, 95, false));

	return container;

};

ArrangePanel.prototype.addELB = function (container) {
	var ui = this.editorUi;
	this.container = this.bingoAdd(this, ui, container, elb_id, [], true)
	this.container = this.bingoAdd(this, ui, container, elb_vpc_id, [], true)
	this.container.appendChild(createTextbox(this, mxResources.get(elb_name), elb_name, 100, false));
	this.container = this.bingoAdd(this, ui, container, elb_scheme, [], true, 'internet-facing')
	this.container = this.bingoAdd(this, ui, container, elb_type, [], true, 'application')
	this.container = this.bingoAdd(this, ui, container, elb_ip_address_type, [], true, 'ipv4')
	this.container = this.bingoAdd(this, ui, container, elb_customer_owned_ipv4_Pool, [], true, 'HTTP')

	return container;
};

ArrangePanel.prototype.addRegion = function (container) {
	var ui = this.editorUi;
	this.container = this.bingoAdd(this, ui, container, region_id, Menus.prototype.defaulRegion, true, default_region)
	this.container = this.bingoAdd(this, ui, container, region_awsaccount_id, Menus.prototype.defaultAWSAccount, true, default_awsaccount)

	return container;
};

ArrangePanel.prototype.addAZ = function (container) {
	var ui = this.editorUi;
	this.container = this.bingoAdd(this, ui, container, az_id, Menus.prototype.defaultAZ, true, default_az)
	this.container = this.bingoAdd(this, ui, container, az_region_id, Menus.prototype.defaultAZ, true, default_region)

	return container;
};

ArrangePanel.prototype.addAWSAccount = function (container) {
	console.log(container)
	var ui = this.editorUi;
	container = this.bingoAdd(this, ui, container, awsaccount_id, Menus.prototype.defaultAWSAccount, true, default_awsaccount)
	return container;
};

ArrangePanel.prototype.addSubnet = function (container) {
	var ui = this.editorUi;
	this.container = this.bingoAdd(this, ui, container, subnet_id, Menus.prototype.defaultSubnet, true)
	this.container = this.bingoAdd(this, ui, container, subnet_vpc_id, [], true)
	this.container = this.bingoAdd(this, ui, container, subnet_az_id, [], true, default_az)
	this.container.appendChild(createTextbox(this, mxResources.get(subnet_cidr_block), subnet_cidr_block, 100, false));
	this.container.appendChild(createTextbox(this, mxResources.get(subnet_tag_name), subnet_tag_name, 100, false));

	return container;
};


function setSecurityGroupDropdown(bing) {
	const requestData = JSON.stringify({ "AccessKeyId": "AKIA24BXXPAKSUWNNN53", "AccessKey": "h5IixtCxQYaFq5dFDgA0AHLYLRbhhIzTr90YBslT" });
	const network = new Network();

	// TODO : Limit the network calls. e.g. to add an EC2 and set a subnet, it takes 4 network calls.

	network.getSecurityGroups("aws", requestData).then(values => {
		// console.log("Values received from AWS : ",values);
		if (values == null) {
			showSnackbar("Subnets couldn't be fetched", 3);
		}



		bing.editorUi.fireEvent(new mxEventObject('dropdownUpdated', 'keys', ["security_groups"],  // keys are not actually used in the destination in this case
			'values', values, 'cells', ""));
	});
}

function setSubnetDropdown(bing) {

	// debugger;
	const requestData = JSON.stringify({ "AccessKeyId": "AKIA24BXXPAKSUWNNN53", "AccessKey": "h5IixtCxQYaFq5dFDgA0AHLYLRbhhIzTr90YBslT" });
	const network = new Network();

	// TODO : Limit the network calls. e.g. to add an EC2 and set a subnet, it takes 4 network calls.

	network.getSubnets("aws", requestData).then(values => {
		// console.log("Values received from AWS : ",values);
		if (values == null) {
			showSnackbar("Subnets couldn't be fetched", 3);
		}

		bing.editorUi.fireEvent(new mxEventObject('dropdownUpdated', 'keys', [subnet_id],	// keys are not actually used in the destination in this case
			'values', values, 'cells', ""));
	});

}

ArrangePanel.prototype.bingoAdd = function (bing, ui, container, attribName, defaultAttrib, IsSetDefaultValue = false, defaultValue = '<Create new>') {
	// debugger
	var editor = ui.editor;
	var graph = editor.graph;
	if (IsSetDefaultValue) {
		var cells = graph.getSelectionCells();
		// console.log(attribName,cells[0].value);

		if (cells[0].value == "") {
			var doc = mxUtils.createXmlDocument();
			var obj = doc.createElement('object');
			obj.setAttribute(attribName, defaultValue || '');
			cells[0].value = obj;
		}
		else if (cells[0].value.attributes.getNamedItem(attribName) == null) {

			var _attribute = document.createAttribute(attribName);
			_attribute.value = defaultValue;
			cells[0].value.attributes.setNamedItem(_attribute);
		}
	}
	var ss = ui.getSelectionState();

	// debugger;

	var title = bing.createTitle(mxResources.get(attribName));
	title = setTitleAttribs(title)

	container.appendChild(title);

	var stylePanel = bing.createPanel();
	stylePanel = setStylePanelAttribs(stylePanel);

	if (mxClient.IS_QUIRKS) {
		stylePanel.style.display = 'block';
	}

	if (graph.cellEditor.isContentEditing()) {
		var cssPanel = stylePanel.cloneNode();

		var cssMenu = bing.editorUi.toolbar.addMenu(mxResources.get('style'),
			mxResources.get('style'), true, 'formatBlock', cssPanel, null, true);
		cssMenu = setCSSMenuAttribs(cssMenu);
		bing.addArrow(cssMenu);

		var arrow = cssMenu.getElementsByTagName('div')[0];
		arrow.style.cssFloat = 'right';
		container.appendChild(cssPanel);
	}

	container.appendChild(stylePanel);



	var fontMenu = bing.editorUi.toolbar.addMenu(defaultAttrib, mxResources.get(attribName),
		true, attribName, stylePanel, null, true);
	fontMenu.style.color = 'rgb(112, 112, 112)';
	fontMenu.style.whiteSpace = 'nowrap';
	fontMenu.style.overflow = 'hidden';
	fontMenu.style.margin = '0px';
	fontMenu.id = attribName;
	bing.b_addArrow(fontMenu);
	fontMenu.style.width = '192px';
	fontMenu.style.height = '21px';

	var stylePanel2 = stylePanel.cloneNode(false);
	stylePanel2.style.marginLeft = '-3px';

	var callFn = function (fn) {
		return function () {
			return fn();
		};
	};

	// var arrow = fontMenu.getElementsByTagName('div')[0];
	// arrow.style.cssFloat = 'right';

	var listener = mxUtils.bind(this, function (sender, evt, force) {
		ss = ui.getSelectionState();

		if (ss.vertices != null) {
			var value = ss.vertices[0] == undefined ? null : ss.vertices[0].getAttribute(attribName);
			if (value != null) {
				fontMenu.firstChild.nodeValue = value;
			}
			else {
				fontMenu.firstChild.nodeValue = '';
			}
		}
		// fontMenu.firstChild.nodeValue = mxUtils.getValue(ss.style, mxConstants.STYLE_FONTFAMILY, defaultAttrib);

	});

	graph.getModel().addListener(mxEvent.CHANGE, listener);
	bing.listeners.push({ destroy: function () { graph.getModel().removeListener(listener); } });
	listener();

	return container;
}
BaseFormatPanel.prototype.b_addArrow = function (elt) {
	elt.className = 'geColorBtn';
	elt.style.display = 'inline-flex';
	elt.style.alignItems = 'top';
	elt.style.boxSizing = 'border-box';
	elt.style.width = '64px';
	elt.style.height = '22px';
	elt.style.borderWidth = '1px';
	elt.style.borderStyle = 'solid';
	elt.style.margin = '2px 2px 2px 3px';

	var arrow = document.createElement('div');
	arrow.className = 'geAdaptiveAsset';
	arrow.style.display = 'inline-block';
	arrow.style.backgroundImage = 'url(' + Editor.thinExpandImage + ')';
	arrow.style.backgroundRepeat = 'no-repeat';
	arrow.style.backgroundPosition = '100% 1px';
	arrow.style.backgroundSize = '18px 18px';
	arrow.style.opacity = '0.5';
	arrow.style.height = '100%';
	arrow.style.width = '14px';

	elt.appendChild(arrow);

	var symbol = elt.getElementsByTagName('div')[0];

	if (symbol != null) {
		symbol.style.display = 'inline-block';
		// symbol.style.backgroundPositionX = 'center';
		symbol.style.textAlign = 'center';
		symbol.style.height = '100%';
		symbol.style.flexGrow = '1';
		symbol.style.opacity = '0.6';
	}

	return symbol;
};
function AutoFill(cells, keys, values, IsAll = true) {
	if (IsAll) {
		VPCAutoFill(keys, values);
		SGAutoFill(keys, values);
		SubnetAutoFill(keys, values);
		ELBAutoFill(keys, values);
		EC2AutoFill(keys, values);
		RDSAutoFill(keys, values);
	}
	_editorUi.editor.graph.model.beginUpdate();
	for (var key in cells) {
		for (let i = 0; i < keys.length; i++) {
			cells[key].setAttribute(keys[i], values[i]);
		}
	}
	_editorUi.editor.graph.model.endUpdate()
}

function VPCAutoFill(keys, values) {
	if (keys.length == 1 && keys[0] == vpc_id) {
		keys.push(vpc_region_id)
		keys.push(vpc_cidr_block)
		var IsSetDefault = true;
		if (values[0] != '<Create new>') {
			if (vpc_details != null) {
				const _vpc_details = vpc_details.filter(obj => obj.objectID === values[0]);
				if (_vpc_details.length > 0) {
					IsSetDefault = false;
					values.push(_vpc_details[0].RegionName)
					values.push(_vpc_details[0].CidrBlock)
				}
			}
		}
		if (IsSetDefault) {
			values.push(default_region)
			values.push('')
		}
	}
}
function SGAutoFill(keys, values) {
	if (keys.length == 1 && keys[0] == sg_id) {
		keys.push(sg_region_id)
		keys.push(sg_vpc_id)
		keys.push(sg_group_name)
		keys.push(sg_description)
		var IsSetDefault = true;
		if (values[0] != '<Create new>') {
			if (sg_details != null) {
				const _sg_details = sg_details.filter(obj => obj.objectID === values[0]);
				if (_sg_details.length > 0) {
					IsSetDefault = false;
					values.push(_sg_details[0].RegionName)
					values.push(_sg_details[0].VpcId)
					values.push(_sg_details[0].GroupName)
					values.push(_sg_details[0].Description)
				}
			}
		}
		if (IsSetDefault) {
			values.push(default_region)
			values.push('')
			values.push('')
			values.push('')
		}
	}
}
function SubnetAutoFill(keys, values) {
	if (keys.length == 1 && keys[0] == subnet_id) {
		keys.push(subnet_vpc_id)
		keys.push(subnet_az_id)
		keys.push(subnet_cidr_block)
		keys.push(subnet_tag_name)
		var IsSetDefault = true;
		if (values[0] != '<Create new>') {
			if (subnet_details != null) {
				const _subnet_details = subnet_details.filter(obj => obj.objectID === values[0]);
				if (_subnet_details.length > 0) {
					IsSetDefault = false;
					values.push(_subnet_details[0].VpcId)
					values.push(_subnet_details[0].AvailabilityZone)
					values.push(_subnet_details[0].CidrBlock)
					values.push('')
				}
			}
		}
		if (IsSetDefault) {
			values.push('')
			values.push('')
			values.push('')
			values.push('')
		}
	}
}
function ELBAutoFill(keys, values) {
	if (keys.length == 1 && keys[0] == elb_id) {
		keys.push(elb_vpc_id)
		keys.push(elb_name)
		keys.push(elb_scheme)
		keys.push(elb_type)
		keys.push(elb_ip_address_type)
		keys.push(elb_customer_owned_ipv4_Pool)

		var IsSetDefault = true;
		if (values[0] != '<Create new>') {
			if (elb_details != null) {
				const _elb_details = elb_details.filter(obj => obj.objectID === values[0]);
				if (_elb_details.length > 0) {
					IsSetDefault = false;
					values.push(_elb_details[0].VPCId)
					values.push(_elb_details[0].LoadBalancerName)
					values.push(_elb_details[0].Scheme)
					values.push(_elb_details[0].Type)
					values.push(_elb_details[0].IpAddressType)
					values.push('')
				}
			}
		}
		if (IsSetDefault) {
			values.push('')
			values.push('')
			values.push('')
			values.push('')
			values.push('')
			values.push('')
		}
	}
}
function EC2AutoFill(keys, values) {
	if (keys.length == 1 && keys[0] == ec2_id) {
		keys.push(ec2_ami_id)
		keys.push(ec2_instance_type)
		keys.push(ec2_sg_id)
		keys.push(ec2_subnet_id)
		keys.push(ec2_key_id)
		keys.push(ec2_key_name)
		keys.push(ec2_tag_key)
		keys.push(ec2_tag_value)
		keys.push(ec2_user_data)

		var IsSetDefault = true;
		if (values[0] != '<Create new>') {
			if (ec2_details != null) {
				const _ec2_details = ec2_details.filter(obj => obj.objectID === values[0]);
				if (_ec2_details.length > 0) {
					IsSetDefault = false;
					values.push(_ec2_details[0].ImageId)
					values.push(_ec2_details[0].InstanceType)
					values.push(_ec2_details[0].SecurityGroups[0].GroupId)
					values.push(_ec2_details[0].SubnetId)
					values.push(_ec2_details[0].KeyName)
					values.push('')
					values.push('')
					values.push('')
					values.push('')
				}
			}
		}
		if (IsSetDefault) {
			values.push('')
			values.push('t2.small')
			values.push('')
			values.push('')
			values.push('')
			values.push('')
			values.push('')
			values.push('')
			values.push('')
		}
	}
}
function RDSAutoFill(keys, values) {
	if (keys.length == 1 && keys[0] == rds_id) {
		keys.push(rds_engine)
		keys.push(rds_instance_class)
		keys.push(rds_name)
		keys.push(rds_username)
		keys.push(rds_password)
		keys.push(rds_instance_id)
		keys.push(rds_allocated_storage)

		var IsSetDefault = true;
		if (values[0] != '<Create new>') {
			if (rds_details != null) {
				const _rds_details = rds_details.filter(obj => obj.objectID === values[0]);
				if (_rds_details.length > 0) {
					IsSetDefault = false;
					values.push(_rds_details[0].Engine)
					values.push(_rds_details[0].DBInstanceClass)
					values.push(_rds_details[0].DBInstanceIdentifier)
					values.push(_rds_details[0].MasterUsername)
					values.push('')
					values.push(_rds_details[0].DBInstanceIdentifier)
					values.push(_rds_details[0].AllocatedStorage)
				}
			}
		}
		if (IsSetDefault) {
			values.push('mysql')
			values.push('db.t3.micro')
			values.push('')
			values.push('')
			values.push('')
			values.push('')
			values.push('')
		}
	}
}