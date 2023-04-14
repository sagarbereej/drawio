//------------------------------------All Global Project Variable Declare Here--------------
let _editorUi=null;
let _graph=null;
let _menus=null;
let _cells=null;

let default_awsaccount='work';
let default_region='ap-south-1';
let default_az='ap-south-1b';

let awsaccount_id='awsaccount_id';

let region_id='region_id';
let region_awsaccount_id='region_awsaccount_id';

let vpc_id='vpc_id';
let vpc_cidr_block='vpc_cidr_block';
let vpc_region_id='vpc_region_id';

let sg_id='sg_id';
let sg_region_id='sg_region_id';
let sg_vpc_id='sg_vpc_id';
let sg_description='sg_description';
let sg_group_name='sg_group_name';

let az_id='az_id'
let az_region_id='az_region_id'

let subnet_id='subnet_id';
let subnet_vpc_id='subnet_vpc_id';
let subnet_az_id='subnet_az_id';
let subnet_cidr_block='subnet_cidr_block';
let subnet_tag_name='subnet_tag_name';

let elb_id='elb_id';
let elb_vpc_id='elb_vpc_id';
let elb_name='elb_name';
let elb_scheme='elb_scheme';
let elb_type='elb_type';
let elb_ip_address_type='elb_ip_address_type';
let elb_customer_owned_ipv4_Pool='elb_customer_owned_ipv4_Pool';

let ec2_id='ec2_id';
let ec2_ami_id ='ec2_ami_id';
let ec2_instance_type ='ec2_instance_type';
let ec2_key_id ='ec2_key_id';
let ec2_key_name ='ec2_key_name';
let ec2_sg_id ='ec2_sg_id';
let ec2_subnet_id  ='ec2_subnet_id';
let ec2_tag_key   ='ec2_tag_key';
let ec2_tag_value    ='ec2_tag_value';
let ec2_user_data     ='ec2_user_data';

let rds_id='rds_id';  
let rds_name='rds_name';  
let rds_username='rds_username';  
let rds_password='rds_password';  
let rds_instance_id='rds_instance_id';  
let rds_instance_class='rds_instance_class';  
let rds_engine='rds_engine';  
let rds_allocated_storage='rds_allocated_storage';  

let ec2_ids = [];
let vpc_ids = [];
let subnet_ids = [];
let sg_ids = [];
let elb_ids = [];
let rds_ids = [];
let region_ids = [];
let az_ids = [];
let ec2_instance_types = [];
let ec2_keys = [];
let ec2_ami_ids = [];
let awsaccount_ids = ['work', 'personal-1'];
let elb_schemes = ['internet-facing', 'internal'];
let elb_types =['application', 'network', 'gateway'];
let elb_ip_address_types =  ['ipv4', 'Dualstack'];
let elb_customer_owned_ipv4_Pools =  ['HTTP', 'HTTPS (Secure HTTP)'];
let rds_instance_classes = ['db.t2.micro', 'db.t2.small', 'db.t3.small', 'db.t3.micro', 'db.m4.large', 'db.m4.xlarge'];
let rds_engines = [];

let vpc_details=null;
let az_details=null;
let sg_details=null;
let tg_details=null;
let subnet_details=null;
let elb_details=null;
let ec2_details=null;
let region_details=null;
let rds_details=null;

let IsLiveMonitoringStart=false;
let monitoringHTML=`
<label class="switch ">
  <input type="checkbox" id="monitoring" onChange=" MonitoringChange()">
  <span class="slider round"></span>
</label>
<a class="geItem monitoring">Live Monitoring</a>`;
let baseApiUrl="https://localhost:44392/api/clouder/"
if (window.location.hostname.includes("test") || window.location.hostname.includes("cloudernode")) {
  baseApiUrl= "https://clouderapis-test.azurewebsites.net/api/clouder/";
} else if (window.location.hostname.includes("demo")) {
  baseApiUrl="https://clouderapis-demo.azurewebsites.net/api/clouder/";
}
let networkAPI = null;
let login_user_id=0;
let login_cloud_account_id=0;

let cloud_accounts_html='';


var xhr = new XMLHttpRequest();
xhr.open("GET", "/js/custom/b_html/account.html", true);
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
     cloud_accounts_html = xhr.responseText;
  }
};
xhr.send();


let _shape_cloud="mxgraph.aws3.aws_cloud";
let _shape_region="mxgraph.aws3.region";
let _shape_vpc="mxgraph.aws3.aws_vpc";
let _shape_sg="mxgraph.aws3.security_group";
let _shape_az="mxgraph.aws3.availability_zone";
let _shape_subnet="mxgraph.aws3.subnet";
let _shape_elb="mxgraph.aws3.application_load_balancer";
let _shape_ec2="mxgraph.aws3.ec2";
let _shape_rds="mxgraph.aws3.rds";

let _default_padding=10;


let _isOpenDiagramSavePopupStarting=true;
let _auth=null;
let _db=null;

let _IsLoadLiveData=true;
