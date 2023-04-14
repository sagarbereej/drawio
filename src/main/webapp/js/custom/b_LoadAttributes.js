async function refreshAWSConfigs(bing) {

	console.log("refreshAWSConfigs",login_cloud_account_id)
	ec2_ids = await networkAPI.getEC2();
	if (login_cloud_account_id!=0 && _IsLoadLiveData ) {
		vpc_ids = await networkAPI.getVPCs();
		subnet_ids = await networkAPI.getSubnets();
		sg_ids = await networkAPI.getSecurityGroups();
		elb_ids = await networkAPI.getELB();
		rds_ids = await networkAPI.getRDS();
		az_ids = await networkAPI.getAZs();
	}
	
	updateDropdown(bing, ec2_ids, ec2_id, true);
	updateDropdown(bing, vpc_ids, vpc_id, true);
	updateDropdown(bing, subnet_ids, subnet_id, true);
	updateDropdown(bing, sg_ids, sg_id, true);
	updateDropdown(bing, elb_ids, elb_id, true);
	updateDropdown(bing, rds_ids, rds_id, true);
	updateDropdown(bing, region_ids, region_id, false);
	updateDropdown(bing, az_ids, az_id, false);
	
	if (login_cloud_account_id!=0 && _IsLoadLiveData) {
		rds_engines = await networkAPI.getRDSEngines();
		region_ids = await networkAPI.getRegions();
		ec2_instance_types = await networkAPI.getEC2Sizes();
		ec2_keys = await networkAPI.getEC2Keys();
		ec2_ami_ids = await networkAPI.getEC2AMIs();
	}
	updateDropdown(bing, vpc_ids, sg_vpc_id, false);
	updateDropdown(bing, vpc_ids, subnet_vpc_id, false);
	updateDropdown(bing, vpc_ids, subnet_vpc_id, false);
	updateDropdown(bing, vpc_ids, elb_vpc_id, false);
	updateDropdown(bing, awsaccount_ids, awsaccount_id, false);
	
	updateDropdown(bing, subnet_ids, ec2_subnet_id, false);
	
	updateDropdown(bing, sg_ids, ec2_sg_id, false);



	updateDropdown(bing, region_ids, vpc_region_id, false);
	updateDropdown(bing, region_ids, sg_region_id, false);
	updateDropdown(bing, region_ids, az_region_id, false);

	updateDropdown(bing, az_ids, subnet_az_id, false);

	updateDropdown(bing, ec2_instance_types, ec2_instance_type, false);

	updateDropdown(bing, ec2_ami_ids, ec2_ami_id, false);

	updateDropdown(bing, ec2_keys, ec2_key_id, false);

	updateDropdown(bing, awsaccount_ids, region_awsaccount_id, false);

	updateDropdown(bing, elb_schemes, elb_scheme, false);
	updateDropdown(bing, elb_types, elb_type, false);
	updateDropdown(bing, elb_ip_address_types, elb_ip_address_type, false);
	updateDropdown(bing, elb_customer_owned_ipv4_Pools, elb_customer_owned_ipv4_Pool, false);
	updateDropdown(bing, rds_instance_classes, rds_instance_class, false);
	updateDropdown(bing, rds_engines, rds_engine, false);


}

function updateDropdown(bing, list, attrib, addDefault = false) {

// return;
	var graph = _editorUi.editor.graph;

	if (addDefault) list.push("<Create new>");


	bing.put(attrib, new Menu(mxUtils.bind(this, function (menu, parent) {

		var addItem = mxUtils.bind(this, function (dropdownItemName) {
			// debugger;
			// console.log(dropdownItemName);
			var tr = bing.styleChange(menu, dropdownItemName, [attrib], [dropdownItemName], null, parent, function () {
				// console.log(dropdownItemName);
				document.execCommand(attrib, false, dropdownItemName);
			}, function () {
				graph.updateLabelElements(graph.getSelectionCells(), function (elt) {
					elt.removeAttribute('face');
					elt.style.fontFamily = null;

					if (elt.nodeName == 'PRE') {
						graph.replaceElement(elt, 'div');
					}
				});

				//Add the font to the file in case it was a previous font from the settings
				if (urlParams['ext-fonts'] == '1') {
					graph.addExtFont(fontName, fontUrl);
				}
				
			});
			tr.firstChild.nextSibling.style.fontFamily = dropdownItemName;

		});


		if (list != null) {
			for (var i = 0; i < list.length; i++) {
				addItem(list[i]);
			}
		}
		// debugger;
		// console.log(attrib, list)

		// menu.addItem(mxResources.get('reset'), null, mxUtils.bind(bing, function()
		// {
		// 	bing.customFonts = [];
		// 	bing.editorUi.fireEvent(new mxEventObject(eventName));
		// }), parent);

	})));
}

