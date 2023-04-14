class Network {

    constructor() {
        this.subnetUrl = "subnet";  
        this.securityGroupUrl = "sg";
        this.elbUrl = "elb";
        this.rdsUrl = "rds";
        this.rdsEngionsUrl = "rdsEngines";
        this.ec2Url = "ec2";
        this.ec2KeysUrl ="ec2Keys";
        this.ec2SizesUrl ="ec2Sizes";
        this.ec2AMIsUrl ="ec2AIMs";
        this.ec2StateEB = "ec2StateEB";
        this.vpcUrl = "vpc";
        this.targetgroupUrl =  "tg";
        this.regionsUrl =  "region";
        this.azUrl =  "az";
    }

    //SK130423
    async createEC2StateEB() {
        var url = this.ec2StateEB;
        var data = await this.clouderAPI("GetIDs",requestBodyJson(url));
        data=JSON.parse(data[url])
        console.log("ec2StateEB received : ", data);
        return data.ResponseCode;
    }
    //SK100223
    async getEC2Sizes() {
        var url = this.ec2SizesUrl;
        var data =  await this.clouderAPI("GetIDs",requestBodyJson(url));
        data=JSON.parse(data[url])
        console.log("EC2Sizes received : ", data);
        return data.body;
    }
    async getEC2() {
        var url = this.ec2Url;
        var data = await this.clouderAPI("GetIDs",requestBodyJson(url));
        data=JSON.parse(data[url])
        console.log("EC2 received : ", data);
        ec2_details=JSON.parse(data.ProviderResponse.replaceAll('\'','"'));
        return data.ProviderIds;
    }
    async getEC2Keys() {
        var url = this.ec2KeysUrl;
        var data = await this.clouderAPI("GetIDs",requestBodyJson(url));
        data=JSON.parse(data[url])
        console.log("EC2 Keys received : ", data);
        return data.ProviderIds;
    }
    //SK100223
    async getEC2AMIs() {
        var url = this.ec2AMIsUrl;
        var data = await this.clouderAPI("GetIDs",requestBodyJson(url));
        data=JSON.parse(data[url])
        console.log("EC2AMIs received : ", data);
        return data.ProviderIds;
    }
    //SK100223
    async getVPCs() {
        var url = this.vpcUrl;
        var data = await this.clouderAPI("GetIDs",requestBodyJson(url));
        data=JSON.parse(data[url])
        console.log("VPCs received : ", data);
        vpc_details=JSON.parse(data.ProviderResponse.replaceAll('\'','"'));
        return data.ProviderIds;
    }


    //SK100223
    async getTargetgroups() {
        var url = this.targetgroupUrl;
        var data = await this.clouderAPI("GetIDs",requestBodyJson(url));
        data=JSON.parse(data[url])
        tg_details=JSON.parse(data.ProviderResponse.replaceAll('\'','"'));
        console.log("Target groups received : ", data);
        return data.ProviderIds;
    }

    //SK100223
    async getRegions() {
        var url = this.regionsUrl;
        // debugger;
        var data = await this.clouderAPI("GetIDs",requestBodyJson(url));
        data=JSON.parse(data[url])
        console.log("Regions received : ", data);
        return data;

    }
    //SK230223
    async getAZs() {
        var url = this.azUrl;
        // debugger;
        var data = await this.clouderAPI("GetIDs",requestBodyJson(url));
        data=JSON.parse(data[url])
        console.log("AZs received : ", data);
        return data;

    }

    //SK090223
    async getRDS() {
        var url = this.rdsUrl;
       
       let data= await this.clouderAPI("GetIDs",requestBodyJson(url));
       data=JSON.parse(data[url])
        console.log("RDS received : ", data);
        rds_details=JSON.parse(data.ProviderResponse.replaceAll('\'','"'));
        return data.ProviderIds;

    }
    async getRDSEngines() {
        var url = this.rdsEngionsUrl;
        // debugger;
        var data = await this.clouderAPI("GetIDs",requestBodyJson(url));
        data=JSON.parse(data[url])
        console.log("RDS Engines received : ", data);
        return data.ProviderIds;
    }

    //SK090223
    async getELB() {
        var url = this.elbUrl;
        var data = await this.clouderAPI("GetIDs",requestBodyJson(url));
        data=JSON.parse(data[url])
        console.log("ELB received : ", data);
        elb_details=JSON.parse(data.ProviderResponse.replaceAll('\'','"'));
        // debugger;
        return data.ProviderIds;
    }


    async getKeyPairs() {
        // debugger;
        var url = this.keyPairUrl;
        var data = await this.clouderAPI("GetIDs",requestBodyJson(url));
        data=JSON.parse(data[url])
        console.log("Key Pairs received : ", data);
        return data.ProviderIds;
    }

    async getSecurityGroups() {
        var url = this.securityGroupUrl;
        var data = await this.clouderAPI("GetIDs",requestBodyJson(url));
        data=JSON.parse(data[url])
        console.log("Security groups received : ", data);
        sg_details=JSON.parse(data.ProviderResponse.replaceAll('\'','"'));
        return data.ProviderIds;
    }

    async getSubnets() {
        var url = this.subnetUrl;
        var data = await this.clouderAPI("GetIDs",requestBodyJson(url));
        data=JSON.parse(data[url])
        console.log("Subnets received : ", data);
        subnet_details=JSON.parse(data.ProviderResponse.replaceAll('\'','"'));
        return data.ProviderIds;
    }

    
    async clouderAPI(url,requestData) {
        console.log("clouderAPI",baseApiUrl+url,requestData)
        const response = await fetch(baseApiUrl+url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: requestData
        });
        console.log(response);
        if (response.ok) {
            const data = await response.text();
            const res = JSON.parse(data);
            return res;
        }
        else {
            console.log(response);
        }

    }
   
    
}

function requestBodyJson(serviceName) {
    return JSON.stringify({"serviceName":serviceName,"cloudUserId":login_user_id,"cloudAccountId":login_cloud_account_id});     
}


networkAPI = new Network();
// function logInfo(text)
// {
//     console.log(new Date().getTime());
//     console.log(text);
// }


// TODO : Check if this way of making an API Call is safe
// async function sendNetworkRequest(text) {
//     const url = "https://0uamtrqsvb.execute-api.ap-south-1.amazonaws.com/v1/clouder/aws/subnet";
//     const jBody = JSON.stringify({ "AccessKeyId": "AKIA24BXXPAKSUWNNN53","AccessKey": "h5IixtCxQYaFq5dFDgA0AHLYLRbhhIzTr90YBslT" });
//     const response = await fetch(url,{
//         method: 'POST',
//         mode: 'cors',
//         headers: {
//             'Content-Type': 'application/json',
//           },
//         body:jBody  
//     });
//     if (response.ok)
//     {
//         const data =  await response.text();
//         const res = JSON.parse(data);
//         return res['ProviderIds'];
//     }

// }