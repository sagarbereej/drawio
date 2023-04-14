
Sidebar.prototype.b_addAWS3GroupsPalette = function () {
	var sb = this;
	var n = 'dashed=0;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.aws3.";
	var gn = 'mxgraph.aws3';
	var dt = 'aws group amazon web service group groups';
	var s = 1.5; //scale

	this.addPaletteFunctions('aws3Groups', 'AWS17 / Groups', false,
		[
			// this.createVertexTemplateEntry('shape=mxgraph.aws3.auto_scaling_group;rounded=1;arcSize=10;dashed=1;fillColor=none;gradientColor=none;dashPattern=8 3 1 3;strokeWidth=2;',
			// 	s * 133, s * 133, '', 'Auto Scaling Group', null, null, this.getTagsForStencil(gn, 'auto scaling group', dt).join(' ')),
			// this.createVertexTemplateEntry('shape=mxgraph.aws3.availability_zone;rounded=1;arcSize=10;dashed=1;strokeColor=#F59D56;fillColor=none;gradientColor=none;dashPattern=8 4;strokeWidth=2;',
			// 	s * 133, s * 133, '', 'Availability Zone', null, null, this.getTagsForStencil(gn, 'availability zone', dt).join(' ')),
			// this.createVertexTemplateEntry('shape=mxgraph.aws3.region;rounded=1;arcSize=10;dashed=1;fillColor=none;gradientColor=none;dashPattern=1 1;strokeWidth=2;',
			// 	s * 133, s * 133, '', 'Region', null, null, this.getTagsForStencil(gn, 'region', dt).join(' ')),
			// this.createVertexTemplateEntry('shape=mxgraph.aws3.security_group;rounded=1;arcSize=10;dashed=1;strokeColor=#ff0000;fillColor=none;gradientColor=none;dashPattern=8 4;strokeWidth=2;',
			// 	s * 133, s * 133, '', 'Security Group', null, null, this.getTagsForStencil(gn, 'security group', dt).join(' ')),

			this.addEntry(dt + 'Auto Scaling Group', function () {
				var bg1 = new mxCell('', new mxGeometry(0, 20, 200, 200), 'shape=mxgraph.aws3.auto_scaling_group;rounded=1;arcSize=10;dashed=1;fillColor=none;gradientColor=none;dashPattern=8 3 1 3;strokeWidth=2;');
				bg1.vertex = true;
				 var bg2 = new mxCell('', new mxGeometry(20, 13, 1, 1), n + 'instance;fillColor=#F58534;gradientColor=none;aspect=fixedResizable;');
				 bg2.vertex = true;

				return sb.createVertexTemplateFromCells([bg1,bg2], 200, 220, 'Auto Scaling Group');
			}),
			this.addEntry(dt + 'Availability Zone', function () {
				var bg1 = new mxCell('', new mxGeometry(0, 20, 200, 200), 'shape=mxgraph.aws3.availability_zone;rounded=1;arcSize=10;dashed=1;strokeColor=#F59D56;fillColor=none;gradientColor=none;dashPattern=8 4;strokeWidth=2;');
				bg1.vertex = true;
				bg1.vertex = true;
				 var bg2 = new mxCell('', new mxGeometry(20, 13, 1, 1), n + 'instance;fillColor=#F58534;gradientColor=none;aspect=fixedResizable;');
				 bg2.vertex = true;

				return sb.createVertexTemplateFromCells([bg1,bg2], 200, 220, 'Availability Zone');
			}),
			this.addEntry(dt + 'Region', function () {
				var bg1 = new mxCell('', new mxGeometry(0, 20, 200, 200), 'shape=mxgraph.aws3.region;rounded=1;arcSize=10;dashed=1;fillColor=none;gradientColor=none;dashPattern=1 1;strokeWidth=2;');
				bg1.vertex = true;
				bg1.vertex = true;
				 var bg2 = new mxCell('', new mxGeometry(20, 13, 1, 1), n + 'instance;fillColor=#F58534;gradientColor=none;aspect=fixedResizable;');
				 bg2.vertex = true;

				return sb.createVertexTemplateFromCells([bg1,bg2], 200, 220, 'Region');
			}),
			this.addEntry(dt + 'Security Group', function () {
				var bg1 = new mxCell('', new mxGeometry(0, 20, 200, 200), 'shape=mxgraph.aws3.security_group;rounded=1;arcSize=10;dashed=1;strokeColor=#ff0000;fillColor=none;gradientColor=none;dashPattern=8 4;strokeWidth=2;');
				bg1.vertex = true;
				bg1.vertex = true;
				 var bg2 = new mxCell('', new mxGeometry(20, 13, 1, 1), n + 'instance;fillColor=#F58534;gradientColor=none;aspect=fixedResizable;');
				 bg2.vertex = true;

				return sb.createVertexTemplateFromCells([bg1,bg2], 200, 220, 'Security Group');
			}),
			this.addEntry(dt + 'elastic beanstalk container', function () {
				var bg1 = new mxCell('', new mxGeometry(0, 20, 200, 200), 'rounded=1;arcSize=10;dashed=0;fillColor=none;gradientColor=none;strokeWidth=2;aspect=fixedResizable;');
				bg1.vertex = true;
				var bg2 = new mxCell('', new mxGeometry(20, 0, 30, 41), n + 'elastic_beanstalk;fillColor=#F58536;gradientColor=none;dashed=0;aspect=fixedResizable;');
				bg2.vertex = true;

				return sb.createVertexTemplateFromCells([bg1, bg2], 200, 220, 'Elastic Beanstalk Container');
			}),

			this.addEntry(dt + 'ec2 instance container', function () {
				var bg1 = new mxCell('', new mxGeometry(0, 20, 200, 200), 'rounded=1;arcSize=10;dashed=0;fillColor=none;gradientColor=none;strokeWidth=2;');
				bg1.vertex = true;
				var bg2 = new mxCell('', new mxGeometry(20, 0, 40, 41), n + 'instance;fillColor=#F58536;gradientColor=none;dashed=0;aspect=fixedResizable;');
				bg2.vertex = true;

				return sb.createVertexTemplateFromCells([bg1, bg2], 200, 220, 'EC2 Instance Container');
			}),

			this.addEntry(dt + 'vpc subnet', function () {
				var bg1 = new mxCell('', new mxGeometry(0, 20, 200, 200), 'shape=mxgraph.aws3.subnet;rounded=1;arcSize=10;dashed=0;fillColor=none;gradientColor=none;strokeWidth=2;');
				bg1.vertex = true;
				var bg2 = new mxCell('', new mxGeometry(20, 0, 30, 35), n + 'permissions;fillColor=#D9A741;gradientColor=none;dashed=0;aspect=fixedResizable;');
				bg2.vertex = true;
				// console.log('subnetCell',bg2)
				// debugger
				return sb.createVertexTemplateFromCells([bg1, bg2], 200, 220, 'VPC Subnet');
			}),

			this.createVertexTemplateEntry('rounded=1;arcSize=10;strokeColor=none;fillColor=#DBDBDB;gradientColor=none;',
				s * 133, s * 133, '', 'Server Contents', null, null, this.getTagsForStencil(gn, 'server contents', dt).join(' ')),

			this.addEntry(dt + 'virtual private cloud', function () {
				var bg1 = new mxCell('', new mxGeometry(0, 20, 200, 200), 'shape=mxgraph.aws3.aws_vpc;rounded=1;arcSize=10;dashed=0;fillColor=none;gradientColor=none;strokeWidth=2;');
				bg1.vertex = true;
				var bg2 = new mxCell('', new mxGeometry(20, 0, 52, 36), n + 'virtual_private_cloud;virtual_private_cloud;fillColor=#F58536;gradientColor=none;dashed=0;aspect=fixedResizable;');
				bg2.vertex = true;

				return sb.createVertexTemplateFromCells([bg1, bg2], 200, 220, 'Virtual Private Cloud');
			}),

			this.addEntry(dt + 'cloud', function () {
				var bg1 = new mxCell('', new mxGeometry(0, 20, 200, 200), 'shape=mxgraph.aws3.aws_cloud;rounded=1;arcSize=10;dashed=0;fillColor=none;gradientColor=none;strokeWidth=2;');
				bg1.vertex = true;
				var bg2 = new mxCell('', new mxGeometry(20, 0, 52, 36), n + 'cloud;fillColor=#F58536;gradientColor=none;dashed=0;aspect=fixedResizable;');
				bg2.vertex = true;

				return sb.createVertexTemplateFromCells([bg1, bg2], 200, 220, 'AWS Cloud');
			}),

			this.addEntry(dt + 'corporate data center', function () {
				var bg1 = new mxCell('', new mxGeometry(0, 20, 200, 200), 'rounded=1;arcSize=10;dashed=0;fillColor=none;gradientColor=none;strokeWidth=2;');
				bg1.vertex = true;
				var bg2 = new mxCell('', new mxGeometry(20, 0, 30, 42), n + 'corporate_data_center;fillColor=#7D7C7C;gradientColor=none;dashed=0;aspect=fixedResizable;');
				bg2.vertex = true;

				return sb.createVertexTemplateFromCells([bg1, bg2], 200, 220, 'Corporate Data Center');
			})
		]);
};
Sidebar.prototype.b_addAWS3ComputePalette = function () {
	var sb = this;
	var n = 'outlineConnect=0;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.aws3.";
	var gn = 'mxgraph.aws3';
	var dt = 'aws amazon web service compute';
	var s = 1.5; //scale

	this.addPaletteFunctions('aws3Compute', 'AWS17 / Compute', false,
		[

			this.createVertexTemplateEntry(n + 'ami;fillColor=#F58534;gradientColor=none;aspect=fixedResizable;',
				s * 40, s * 42, '', 'AMI', null, null, this.getTagsForStencil(gn, 'ami', dt).join(' ')),
			this.createVertexTemplateEntry(n + 'ec2;fillColor=#F58534;gradientColor=none;aspect=fixedResizable;',
				s * 51, s * 62, '', 'EC2', null, null, this.getTagsForStencil(gn, 'ec2', dt).join(' ')),
			this.createVertexTemplateEntry(n + 'elastic_load_balancing;fillColor=#F58534;gradientColor=none;aspect=fixedResizable;',
				s * 51, s * 62, '', 'Elastic Load Balancing', null, null, this.getTagsForStencil(gn, 'elastic load balancing', dt).join(' ')),
			this.createVertexTemplateEntry(n + 'auto_scaling;fillColor=#F58534;gradientColor=none;aspect=fixedResizable;',
				s * 53, s * 51, '', 'Auto Scaling', null, null, this.getTagsForStencil(gn, 'auto scaling', dt).join(' ')),
			this.createVertexTemplateEntry(n + 'elastic_ip;fillColor=#F58534;gradientColor=none;aspect=fixedResizable;',
				s * 51, s * 14, '', 'Elastic IP', null, null, this.getTagsForStencil(gn, 'elastic ip', dt).join(' ')),
			this.createVertexTemplateEntry(n + 'elastic_beanstalk;fillColor=#F58534;gradientColor=none;',
				s * 45, s * 62, '', 'Elastic Beanstalk', null, null, this.getTagsForStencil(gn, 'elastic beanstalk', dt).join(' ')),
			this.createVertexTemplateEntry(n + 'lambda;fillColor=#F58534;gradientColor=none;',
				s * 51, s * 62, '', 'Lambda', null, null, this.getTagsForStencil(gn, 'lambda', dt).join(' ')),
			this.createVertexTemplateEntry(n + 'ecs;fillColor=#F58534;gradientColor=none;',
				s * 48, s * 45, '', 'ECS', null, null, this.getTagsForStencil(gn, 'ecs', dt).join(' ')),
			this.createVertexTemplateEntry(n + 'db_on_instance;fillColor=#F58534;gradientColor=none;aspect=fixedResizable;',
				s * 40, s * 43, '', 'DB on Instance', null, null, this.getTagsForStencil(gn, 'db on instance database', dt).join(' ')),
			this.createVertexTemplateEntry(n + 'instance;fillColor=#F58534;gradientColor=none;aspect=fixedResizable;',
				s * 40, s * 42, '', 'Instance', null, null, this.getTagsForStencil(gn, 'instance', dt).join(' ')),
			this.createVertexTemplateEntry(n + 'lightsail;fillColor=#F58534;gradientColor=none;',
				s * 51, s * 55, '', 'Lightsail', null, null, this.getTagsForStencil(gn, 'lightsail', dt).join(' ')),
			this.createVertexTemplateEntry(n + 'endpoints;fillColor=#F58534;gradientColor=none;',
				s * 46, s * 48, '', 'Endpoints', null, null, this.getTagsForStencil(gn, 'endpoints', dt).join(' ')),
			this.createVertexTemplateEntry(n + 'instances;fillColor=#F58534;gradientColor=none;',
				s * 40, s * 42, '', 'Instances', null, null, this.getTagsForStencil(gn, 'instances', dt).join(' ')),
			this.createVertexTemplateEntry(n + 'elastic_network_interface;fillColor=#F58534;gradientColor=none;',
				s * 46, s * 48, '', 'Elastic Network Interface', null, null, this.getTagsForStencil(gn, 'elastic network interface', dt).join(' ')),
			this.createVertexTemplateEntry(n + 'internet_gateway;fillColor=#F58534;gradientColor=none;',
				s * 46, s * 48, '', 'Internet Gateway', null, null, this.getTagsForStencil(gn, 'internet gateway', dt).join(' ')),
			this.createVertexTemplateEntry(n + 'flow_logs;fillColor=#F58534;gradientColor=none;',
				s * 46, s * 48, '', 'Flow Logs', null, null, this.getTagsForStencil(gn, 'flow logs', dt).join(' ')),
			this.createVertexTemplateEntry(n + 'customer_gateway;fillColor=#F58534;gradientColor=none;',
				s * 46, s * 48, '', 'Customer Gateway', null, null, this.getTagsForStencil(gn, 'customer gateway', dt).join(' ')),
			this.createVertexTemplateEntry(n + 'instance_with_cloudwatch;fillColor=#F58534;gradientColor=none;',
				s * 40, s * 42, '', 'Instance with CloudWatch', null, null, this.getTagsForStencil(gn, 'instance with cloudwatch', dt).join(' ')),
			this.createVertexTemplateEntry(n + 'elastic_network_adapter;fillColor=#F58534;gradientColor=none;',
				s * 50, s * 60, '', 'Elastic Network Adapter', null, null, this.getTagsForStencil(gn, 'elastic network adapter', dt).join(' ')),
			this.createVertexTemplateEntry(n + 'optimized_instance;fillColor=#F58534;gradientColor=none;',
				s * 40, s * 42, '', 'Optimized Instance', null, null, this.getTagsForStencil(gn, 'optimized instance', dt).join(' ')),
			this.createVertexTemplateEntry(n + 'rescue;fillColor=#F58534;gradientColor=none;',
				s * 42, s * 44, '', 'Rescue', null, null, this.getTagsForStencil(gn, 'rescue', dt).join(' ')),
			this.createVertexTemplateEntry(n + 'spot_instance;fillColor=#F58534;gradientColor=none;',
				s * 40, s * 42, '', 'Spot Instance', null, null, this.getTagsForStencil(gn, 'spot instance', dt).join(' ')),

			this.addEntry(dt + 'Spot Fleet', function () {
				var bg1 = new mxCell('', new mxGeometry(0, 30, 200, 200), 'rounded=1;fillColor=none;gradientColor=none;arcSize=10;dashed=1;');
				bg1.vertex = true;
				var bg2 = new mxCell('', new mxGeometry(20, 0, 43, 40), n + 'spot_instance;fillColor=#F58534;strokeColor=none;gradientColor=none;');
				bg2.vertex = true;

				return sb.createVertexTemplateFromCells([bg1, bg2], 200, 230, 'Spot Fleet');
			}),

			this.createVertexTemplateEntry(n + 'ecr;fillColor=#F58534;gradientColor=none;',
				s * 46, s * 48, '', 'ECR', null, null, this.getTagsForStencil(gn, 'ecr', dt).join(' ')),
			this.createVertexTemplateEntry(n + 'vpn_gateway;fillColor=#F58534;gradientColor=none;',
				s * 46, s * 48, '', 'VPN Gateway', null, null, this.getTagsForStencil(gn, 'vpn gateway virtual private network', dt).join(' ')),
			this.createVertexTemplateEntry(n + 'deployment;fillColor=#F58534;gradientColor=none;',
				s * 37, s * 49, '', 'Deployment', null, null, this.getTagsForStencil(gn, 'deployment', dt).join(' ')),
			this.createVertexTemplateEntry(n + 'vpn_connection;fillColor=#F58534;gradientColor=none;',
				s * 39, s * 32, '', 'VPN Connection', null, null, this.getTagsForStencil(gn, 'vpn connection virtual private network', dt).join(' ')),
			this.createVertexTemplateEntry(n + 'vpc_peering;fillColor=#F58534;gradientColor=none;',
				s * 46, s * 48, '', 'VPC Peering', null, null, this.getTagsForStencil(gn, 'vpc peering virtual private cloud', dt).join(' ')),
			this.createVertexTemplateEntry(n + 'application;fillColor=#F58534;gradientColor=none;',
				s * 23, s * 43, '', 'Application', null, null, this.getTagsForStencil(gn, 'application', dt).join(' ')),
			this.createVertexTemplateEntry(n + 'ec2_compute_container;fillColor=#F58534;gradientColor=none;',
				s * 40, s * 23, '', 'EC2 Compute Container', null, null, this.getTagsForStencil(gn, 'ec2 compute container', dt).join(' ')),
			this.createVertexTemplateEntry(n + 'ec2_compute_container_2;fillColor=#F58534;gradientColor=none;',
				s * 40, s * 23, '', 'EC2 Compute Container', null, null, this.getTagsForStencil(gn, 'ec2 compute container', dt).join(' ')),
			this.createVertexTemplateEntry(n + 'ec2_compute_container_3;fillColor=#F58534;gradientColor=none;',
				s * 40, s * 23, '', 'EC2 Compute Container', null, null, this.getTagsForStencil(gn, 'ec2 compute container', dt).join(' ')),
			this.createVertexTemplateEntry(n + 'vpc_nat_gateway;fillColor=#F58534;gradientColor=none;',
				s * 46, s * 48, '', 'VPC NAT Gateway', null, null, this.getTagsForStencil(gn, 'vpc nat gateway virtual private cloud', dt).join(' ')),
			this.createVertexTemplateEntry(n + 'ecr_registry;fillColor=#F58534;gradientColor=none;',
				s * 38, s * 40, '', 'ECR Registry', null, null, this.getTagsForStencil(gn, 'ecr registry', dt).join(' ')),
			this.createVertexTemplateEntry(n + 'batch;fillColor=#F58534;gradientColor=none;',
				s * 51, s * 62, '', 'Batch', null, null, this.getTagsForStencil(gn, 'batch', dt).join(' ')),
			this.createVertexTemplateEntry(n + 'router;fillColor=#F58534;gradientColor=none;',
				s * 46, s * 48, '', 'Router', null, null, this.getTagsForStencil(gn, 'router', dt).join(' ')),
			this.createVertexTemplateEntry(n + 'vpc;fillColor=#F58534;gradientColor=none;',
				s * 45, s * 54, '', 'VPC', null, null, this.getTagsForStencil(gn, 'vpc virtual private cloud', dt).join(' ')),
			this.createVertexTemplateEntry(n + 'network_access_controllist;fillColor=#F58534;gradientColor=none;',
				s * 46, s * 48, '', 'Network Access Controllist', null, null, this.getTagsForStencil(gn, 'network access controllist', dt).join(' ')),
			this.createVertexTemplateEntry(n + 'lambda_function;fillColor=#F58534;gradientColor=none;',
				s * 46, s * 48, '', 'Lambda Function', null, null, this.getTagsForStencil(gn, 'lambda function', dt).join(' ')),
			this.createVertexTemplateEntry(n + 'classic_load_balancer;fillColor=#F58534;gradientColor=none;',
				s * 46, s * 48, '', 'Classic Load Balancer', null, null, this.getTagsForStencil(gn, 'classic load balancer', dt).join(' ')),
			this.createVertexTemplateEntry(n + 'application_load_balancer;fillColor=#F58534;gradientColor=none;',
				s * 46, s * 48, '', 'Application Load Balancer', null, null, this.getTagsForStencil(gn, 'application load balancer', dt).join(' ')),
			this.createVertexTemplateEntry(n + 'x1_instance;fillColor=#F58534;gradientColor=none;',
				s * 40, s * 42, '', 'X1 Instance', null, null, this.getTagsForStencil(gn, 'x1 instance', dt).join(' '))
		]);
};
Sidebar.prototype.b_addAWS3DatabasePalette = function()
	{
		var sb = this;
		var n = 'outlineConnect=0;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.aws3.";
		var gn = 'mxgraph.aws3';
		var dt = 'aws amazon web service db database';
		var s = 1.5; //scale
		
		this.addPaletteFunctions('aws3Database', 'AWS17 / Database', false,
		[
			 this.createVertexTemplateEntry(n + 'dynamo_db;fillColor=#2E73B8;gradientColor=none;',
					 s * 48, s * 54, '', 'Dynamo DB', null, null, this.getTagsForStencil(gn, 'dynamo', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'elasticache;fillColor=#2E73B8;gradientColor=none;',
					 s * 45, s * 54, '', 'ElastiCache', null, null, this.getTagsForStencil(gn, 'elasticache elastic cache', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'rds;fillColor=#2E73B8;gradientColor=none;aspect=mxGraph.prototype.scaleCell;',
					 s * 48, s * 54, '', 'RDS', null, null, this.getTagsForStencil(gn, 'rds', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'redshift;fillColor=#2E73B8;gradientColor=none;',
					 s * 45, s * 50, '', 'Redshift', null, null, this.getTagsForStencil(gn, 'redshift', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'redis;fillColor=#2E73B8;gradientColor=none;',
					 s * 40, s * 42, '', 'Redis', null, null, this.getTagsForStencil(gn, 'redis', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'rds_db_instance;fillColor=#2E73B8;gradientColor=none;',
					 s * 33, s * 44, '', 'RDS DB Instance', null, null, this.getTagsForStencil(gn, 'rds instance', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'rds_db_instance_read_replica;fillColor=#2E73B8;gradientColor=none;',
					 s * 33, s * 44, '', 'RDS DB Instance Read Replica', null, null, this.getTagsForStencil(gn, 'rds instance read replica', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'oracle_db_instance;fillColor=#2E73B8;gradientColor=none;',
					 s * 40, s * 43, '', 'Oracle DB Instance', null, null, this.getTagsForStencil(gn, 'oracle instance', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'piop;fillColor=#2E73B8;gradientColor=none;',
					 s * 40, s * 42, '', 'PIOP', null, null, this.getTagsForStencil(gn, 'piop', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'attribute;fillColor=#2E73B8;gradientColor=none;',
					 s * 42, s * 44, '', 'Attribute', null, null, this.getTagsForStencil(gn, 'attribute', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'attributes;fillColor=#2E73B8;gradientColor=none;',
					 s * 42, s * 44, '', 'Attributes', null, null, this.getTagsForStencil(gn, 'attributes', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'item;fillColor=#2E73B8;gradientColor=none;',
					 s * 42, s * 44, '', 'Item', null, null, this.getTagsForStencil(gn, 'item', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'global_secondary_index;fillColor=#2E73B8;gradientColor=none;',
					 s * 45, s * 44, '', 'Global Secondary Index', null, null, this.getTagsForStencil(gn, 'global secondary index', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'items;fillColor=#2E73B8;gradientColor=none;',
					 s * 42, s * 44, '', 'Items', null, null, this.getTagsForStencil(gn, 'items', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'db_accelerator;fillColor=#2E73B8;gradientColor=none;',
					 s * 48, s * 54, '', 'DB Accelerator', null, null, this.getTagsForStencil(gn, 'db database accelerator', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'table;fillColor=#2E73B8;gradientColor=none;',
					 s * 45, s * 44, '', 'Table', null, null, this.getTagsForStencil(gn, 'table', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'memcached;fillColor=#2E73B8;gradientColor=none;',
					 s * 40, s * 42, '', 'Memcached', null, null, this.getTagsForStencil(gn, 'memcached', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'mysql_db_instance;fillColor=#2E73B8;gradientColor=none;',
					 s * 40, s * 43, '', 'MySQL DB Instance', null, null, this.getTagsForStencil(gn, 'mysql instance my sql', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'rds_db_instance_standby_multi_az;fillColor=#2E73B8;gradientColor=none;',
					 s * 33, s * 44, '', 'RDS DB Instance standby (multi-AZ)', null, null, this.getTagsForStencil(gn, 'rds instance standby multi', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'cache_node;fillColor=#2E73B8;gradientColor=none;',
					 s * 40, s * 42, '', 'Cache Node', null, null, this.getTagsForStencil(gn, 'cache node', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'sql_master;fillColor=#2E73B8;gradientColor=none;',
					 s * 40, s * 43, '', 'SQL Master', null, null, this.getTagsForStencil(gn, 'sql master', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'sql_slave;fillColor=#2E73B8;gradientColor=none;',
					 s * 40, s * 43, '', 'SQL Slave', null, null, this.getTagsForStencil(gn, 'sql slave', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'ms_sql_instance_2;fillColor=#2E73B8;gradientColor=none;',
					 s * 40, s * 42, '', 'MS SQL Instance', null, null, this.getTagsForStencil(gn, 'ms sql instance', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'mysql_db_instance_2;fillColor=#2E73B8;gradientColor=none;',
					 s * 40, s * 42, '', 'MySQL DB Instance', null, null, this.getTagsForStencil(gn, 'mysql instance my sql', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'ms_sql_instance;fillColor=#2E73B8;gradientColor=none;',
					 s * 40, s * 43, '', 'MS SQL Instance', null, null, this.getTagsForStencil(gn, 'ms sql instance', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'oracle_db_instance_2;fillColor=#2E73B8;gradientColor=none;',
					 s * 40, s * 42, '', 'Oracle DB Instance', null, null, this.getTagsForStencil(gn, 'oracle instance', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'postgre_sql_instance;fillColor=#2E73B8;gradientColor=none;',
					 s * 40, s * 42, '', 'Postgre SQL Instance', null, null, this.getTagsForStencil(gn, 'postgre sql instance', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'dense_compute_node;fillColor=#2E73B8;gradientColor=none;',
					 s * 37, s * 42, '', 'Dense Compute Node', null, null, this.getTagsForStencil(gn, 'dense compute node', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'dense_storage_node;fillColor=#2E73B8;gradientColor=none;',
					 s * 37, s * 42, '', 'Dense Storage Node', null, null, this.getTagsForStencil(gn, 'dense storage node', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'database_migration_workflow_job;fillColor=#2E73B8;gradientColor=none;pointerEvents=1',
					 s * 31, s * 58, '', 'Database Migration Workflow/Job', null, null, this.getTagsForStencil(gn, 'database migration workflow job', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'database_migration_service;fillColor=#2E73B8;gradientColor=none;',
					 s * 48, s * 54, '', 'Database Migration Service', null, null, this.getTagsForStencil(gn, 'database migration service', dt).join(' '))
		]);
	};