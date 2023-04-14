mxGraph.prototype.b_scaleCell = function (cell, dx, dy, recurse) {
	var geo = this.model.getGeometry(cell);

	if (geo != null) {
		var state = this.view.getState(cell);
		var style = (state != null) ? state.style : this.getCellStyle(cell);

		geo = geo.clone();

		// Stores values for restoring based on style
		var x = geo.x;
		var y = geo.y;
		var w = geo.width;
		var h = geo.height;
		if (style[mxConstants.STYLE_ASPECT]==undefined || style[mxConstants.STYLE_ASPECT]!='fixedResizable') {
			geo.scale(dx, dy, style[mxConstants.STYLE_ASPECT] == 'fixed');
		}

		if (style[mxConstants.STYLE_RESIZE_WIDTH] == '1') {
			geo.width = w * dx;
		}
		else if (style[mxConstants.STYLE_RESIZE_WIDTH] == '0') {
			geo.width = w;
		}

		if (style[mxConstants.STYLE_RESIZE_HEIGHT] == '1') {
			geo.height = h * dy;
		}
		else if (style[mxConstants.STYLE_RESIZE_HEIGHT] == '0') {
			geo.height = h;
		}

		if (!this.isCellMovable(cell)) {
			geo.x = x;
			geo.y = y;
		}

		if (!this.isCellResizable(cell)) {
			geo.width = w;
			geo.height = h;
		}

		if (this.model.isVertex(cell)) {
			this.cellResized(cell, geo, true, recurse);
		}
		else {
			this.model.setGeometry(cell, geo);
		}
	}
};
mxGraph.prototype.b_extendParent = function (cell) {
	if (cell != null) {
		var parent = this.model.getParent(cell);
		var p = this.getCellGeometry(parent);

		if (parent != null && p != null && !this.isCellCollapsed(parent)) {
			var geo = this.getCellGeometry(cell);

			if (geo != null && !geo.relative &&
				(p.width < geo.x + geo.width ||
					p.height < geo.y + geo.height)) {
				p = p.clone();
				if (geo.x < _default_padding) {
					geo.x = _default_padding;
				}
				if (geo.y < _default_padding) {
					geo.y = _default_padding;
				}

				const t_width = (geo.x + geo.width) - p.width;
				const t_height = (geo.y + geo.height) - p.height;
				p.width = Math.max(p.width, geo.x + geo.width);
				p.height = Math.max(p.height, geo.y + geo.height);
				//Set Padding Auto Resize SK070423
				if (t_width > -1) {
					p.width += _default_padding;
				}
				if (t_height > -1) {
					p.height += _default_padding;
				}


				this.cellsResized([parent], [p], false);
			}
		}
	}
};

async function updateCloud() {
    
    _cells=_editorUi.editor.graph.model.cells;
    updateMXObjects();
    _graph.model.beginUpdate();
    let _shape = _graph.getSelectionCell();
    if (_shape == undefined || _shape.style == undefined) {
        return;
    }
    console.log(_shape.style)
    let currentShape = _shape.style.split(';')
        .find(function (property) {
            return property.startsWith('shape=');
        })
        .split('=')[1];

    let _ec2_cells = [];
    let _subnet_cells = [];
    let _region_cells = [];
    let _vpc_cells = [];
    let _sg_cells = [];
    let _az_cells = [];
    let _elb_cells = [];
    switch (currentShape) {
        case _shape_ec2:
            _ec2_cells = UpdateEC2Attri();
            break;
        case _shape_subnet:
            _subnet_cells = updateSubnetAttri()
            _ec2_cells = UpdateEC2Attri();
            break;
        case _shape_region:
            _region_cells = UpdateRegionAttri();
            break;
        case _shape_vpc:
            _vpc_cells = UpdateVPCAttri();
            break;
        case _shape_sg:
            _sg_cells = UpdateSGAttri();
            break;
        case _shape_az:
            _az_cells = UpdateAZAttri();
            break;
        case _shape_elb:
            _elb_cells = UpdateELBAttri();
            break;
        default:
            break;
    }
    _graph.model.endUpdate();
    //To Do: Subnet updation is lenghtly process thats why currently stoped
    // if (!IsLiveMonitoringStart) {
    //     return "";
    // }
    // if (_ec2_cells.length>0 || _subnet_cells.length>0) {
    //     for (let i = 0; index < array.length; i++) {
    //         const element = array[i];
    //         // Delete account
    //         const jBody = JSON.stringify({ transactionType: "1", userId: login_user_id, accountId: "" + id + "", isDefault: "1" });
    //         var accounts = await networkAPI.clouderAPI('CloudAccount', jBody)
    //         if (accounts.responseCode == 0) {
    //             // loadAccounts();
    //             login_cloud_account_id = id;
    //         }
    //         else {

    //         }
    //     }
    // }
}
function GetObjectId(_cell, ObjectType, attributeName) {
    while (true) {
        if (_cell.parent != null) {
            if (_cell.parent.style != null && _cell.parent.style.includes(ObjectType)) {
                return _cell.parent.getAttribute(attributeName)
            }
            _cell = _cell.parent;
        }
        else {
            return "";
        }
    }
}
function UpdateAZAttri() {
    _AZ_cells = [];

    for (var key in _cells) {
        let _cell = _cells[key];
        let IsUpdated = false;
        if (_cell.style != null && _cell.style.includes(_shape_az)) {
            let _az_region_id = GetObjectId(_cell, _shape_region, region_id)
            _setAttribute(_cell, az_region_id, _az_region_id)

            if (az_details != null) {
                const _az_details = az_details.filter(obj => obj.objectID == _cell.getAttribute(az_id));
                if (_az_details.length > 0) {
                    if (_az_details[0].RegionName != _az_region_id) {
                        IsUpdated = true;
                    }
                }
            }
        }
        if (IsUpdated) {
            _AZ_cells.push(_cell)
        }
    }
    return _AZ_cells;
}
function UpdateSGAttri() {
    _sg_cells = [];

    for (var key in _cells) {
        let _cell = _cells[key];
        let IsUpdated = false;
        if (_cell.style != null && _cell.style.includes(_shape_sg)) {
            let _sg_region_id = GetObjectId(_cell, _shape_region, region_id)
            _setAttribute(_cell, sg_region_id, _sg_region_id)
            let _sg_vpc_id = GetObjectId(_cell, _shape_vpc, vpc_id)
            _setAttribute(_cell, sg_vpc_id, _sg_vpc_id)

            if (sg_details != null) {
                const _sg_details = sg_details.filter(obj => obj.objectID == _cell.getAttribute(sg_id));
                if (_sg_details.length > 0) {
                    if (_sg_details[0].RegionName != _sg_region_id || _sg_details[0].VpcId != _sg_vpc_id) {
                        IsUpdated = true;
                    }
                }
            }
        }
        if (IsUpdated) {
            _sg_cells.push(_cell)
        }
    }
    return _sg_cells;
}
function UpdateELBAttri() {
    _elb_cells = [];

    for (var key in _cells) {
        let _cell = _cells[key];
        let IsUpdated = false;
        if (_cell.style != null && _cell.style.includes(_shape_elb)) {
            let _elb_vpc_id = GetObjectId(_cell, _shape_vpc, vpc_id)
            _setAttribute(_cell, elb_vpc_id, _elb_vpc_id)

            if (elb_details != null) {
                const _elb_details = elb_details.filter(obj => obj.objectID == _cell.getAttribute(elb_id));
                if (_elb_details.length > 0) {
                    if (_sg_details[0].VpcId != _elb_vpc_id) {
                        IsUpdated = true;
                    }
                }
            }
        }
        if (IsUpdated) {
            _elb_cells.push(_cell)
        }
    }
    return _elb_cells;
}
function UpdateVPCAttri() {
    _vpc_cells = [];

    for (var key in _cells) {
        let _cell = _cells[key];
        let IsUpdated = false;
        if (_cell.style != null && _cell.style.includes(_shape_vpc)) {
            let _vpc_region_id = GetObjectId(_cell, _shape_region, region_id)
            _setAttribute(_cell, vpc_region_id, _vpc_region_id)

            if (vpc_details != null) {
                const _vpc_details = vpc_details.filter(obj => obj.objectID == _cell.getAttribute(vpc_id));
                if (_vpc_details.length > 0) {
                    if (_vpc_details[0].RegionName != _vpc_region_id) {
                        IsUpdated = true;
                    }
                }
            }
        }
        if (IsUpdated) {
            _vpc_cells.push(_cell)
        }
    }
    return _vpc_cells;
}
function UpdateRegionAttri() {
    _region_cells = [];

    for (var key in _cells) {
        let _cell = _cells[key];
        let IsUpdated = false;
        if (_cell.style != null && _cell.style.includes(_shape_region)) {
            let _region_awsaccount_id = GetObjectId(_cell, _shape_cloud, awsaccount_id)
            _setAttribute(_cell, region_awsaccount_id, _region_awsaccount_id)

            if (region_details != null) {
                const _region_details = region_details.filter(obj => obj.objectID == _cell.getAttribute(region_id));
                if (_region_details.length > 0) {
                    if (_region_details[0].region_awsaccount_id != _region_awsaccount_id) {
                        IsUpdated = true;
                    }
                }
            }
        }
        if (IsUpdated) {
            _region_cells.push(_cell)
        }
    }
    return _region_cells;
}
function UpdateEC2Attri() {
    _ec2_cells = [];

    for (var key in _cells) {
        let _cell = _cells[key];
        let IsUpdated = false;
        if (_cell.style != null && _cell.style.includes(_shape_ec2)) {
            let _ec2_subnet_id = GetObjectId(_cell, _shape_subnet, subnet_id)
            let _ec2_sg_id = GetObjectId(_cell, _shape_sg, sg_id)
            _graph.model.beginUpdate();

            _setAttribute(_cell, ec2_subnet_id, _ec2_subnet_id)
            _setAttribute(_cell, ec2_sg_id, _ec2_sg_id)
            _graph.model.endUpdate();
            if (ec2_details != null) {
                const _ec2_details = ec2_details.filter(obj => obj.objectID == _cell.getAttribute(ec2_id));
                if (_ec2_details.length > 0) {
                    if (_ec2_details[0].SubnetId != _ec2_subnet_id || _ec2_details[0].SecurityGroups[0].GroupId != _ec2_sg_id) {
                        IsUpdated = true;
                    }
                }
            }
        }
        if (IsUpdated) {
            _ec2_cells.push(_cell)
        }
    }
    return _ec2_cells;
}

function updateSubnetAttri() {
    _subnet_cells = [];
    for (var key in _cells) {
        let _cell = _cells[key];
        let IsUpdated = false;
        if (_cell.style != null && _cell.style.includes(_shape_subnet)) {
            let _subnet_az_id = GetObjectId(_cell, _shape_az, az_id)
            let _subnet_vpc_id = GetObjectId(_cell, _shape_vpc, vpc_id)
            _setAttribute(_cell, subnet_az_id, _subnet_az_id)
            _setAttribute(_cell, subnet_vpc_id, _subnet_vpc_id)

            if (subnet_details != null) {
                const _subnet_details = subnet_details.filter(obj => obj.objectID == _cell.getAttribute(subnet_id));
                if (_subnet_details.length > 0) {
                    if (_subnet_details[0].VpcId != _subnet_vpc_id || _subnet_details[0].AvailabilityZone != _subnet_az_id) {
                        IsUpdated = true;
                    }
                }
            }
        }
        if (IsUpdated) {
            _subnet_cells.push(_cell)
        }
    }
    return _subnet_cells;
}


function updateMXObjects() {
    let Keys=[];
    for (var key in _cells) {
        Keys.push(key);
    }
    for (let i = 0; i < Keys.length; i++) {
        let _cell = _cells[Keys[i]];
        let IsUpdated = false;
        if (_cell.style != null && (_cell.style.includes(_shape_subnet) || _cell.style.includes(_shape_vpc) || _cell.style.includes(_shape_cloud) || _cell.style.includes(_shape_sg) || _cell.style.includes(_shape_az) || _cell.style.includes(_shape_region))) {
            SetMXObjectParent(_cells[Keys[i+1]], _cell)
        }
        if (IsUpdated) {
            _subnet_cells.push(_cell)
        }  
    }
    
}
function _setAttribute(cell, ParaName, ParaValue) {
    if (ParaValue != undefined && ParaValue != "") {

        cell.setAttribute(ParaName, ParaValue)
    }
}

function SetMXObjectParent(cell, parentCell) {
    if (cell.parent.id != parentCell.id) {
        _editorUi.editor.graph.model.beginUpdate();
        cell.geometry.x = 20;
        if (cell.geometry.width == 1) {
            cell.geometry.y = -1;
        }
        else {
            cell.geometry.y = -20;
        }
        _graph.model.add(parentCell, cell);
        _editorUi.editor.graph.model.endUpdate();
        console.log("Parent Updated")
    }
}