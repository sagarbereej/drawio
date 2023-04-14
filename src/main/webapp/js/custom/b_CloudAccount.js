
async function accountTable() {
    console.log("accountTable", document.getElementById('accountTable'))

    const jBody = JSON.stringify({ "transactionType": "3", "userId": login_user_id });
    var res = await networkAPI.clouderAPI('CloudAccount', jBody)
    console.log(res)


    $(document).ready(function () {
        // Load accounts on page load
        loadAccounts();
    });
}

async function loadAccounts() {
    $('#btnCreateOrUpdate').html("Add");
    const jBody = JSON.stringify({ "transactionType": "3", "userId": login_user_id });
    var accounts = await networkAPI.clouderAPI('CloudAccount', jBody)
    if (accounts.responseCode == 0) {
        var rows = '';
        $.each(JSON.parse(accounts.providerResponse), function (index, account) {
            rows += '<tr class="_a_tr">';
            rows += '<td class="_a_td"><input  type="radio" name="accountRadio" value="' + account.Id + '"';
            if (account.IsDefault) {
                rows += ' checked';
            }
            rows += '></td>';
            rows += '<td class="_a_td">' + (index + 1) + '</td>';
            // rows += '<td class="_a_td">' + account.Id + '</td>';
            rows += '<td class="_a_td">' + account.AccountName + '</td>';
            rows += '<td class="_a_td">' + account.AccessKeyId + '</td>';
            rows += '<td class="_a_td">******</td>';
            rows += '<td class="_a_td"><button type="button" class="geBtn gePrimaryBtn" onclick="editAccount(' + account.Id + ',' + (index + 1) + ')">Edit</button>';
            rows += ' <button type="button" class="geBtn" onclick="deleteAccount(' + account.Id + ')">Delete</button></td>';
            rows += '</tr>';
        });
        $(document).off('change', 'input[name="accountRadio"]');
        $('#accounts').html(rows);
        $(document).on('change', 'input[name="accountRadio"]', function () {
            // Code to handle radio button selection change
            var selectedAccountId = $(this).val();
            console.log("Selected account ID: " + selectedAccountId);
            setDefaultAccount(selectedAccountId);
        });
    }

}

async function createOrUpdate() {
    var id = $('#account-id').val();
    var accountName = $('#account-name').val();
    var accountKeyId = $('#account-key-id').val();
    var accountKey = $('#account-key').val();

    if (id) {
        // Update existing account
        const jBody = JSON.stringify({ transactionType: "1", userId: login_user_id, accountId: "" + id + "", accountName: accountName, accessKeyId: accountKeyId, accessKey: accountKey });
        var accounts = await networkAPI.clouderAPI('CloudAccount', jBody)
        if (accounts.responseCode == 0) {
            loadAccounts();
            resetForm();
        }
        else {

        }


    } else {
        // Create new account
        const jBody = JSON.stringify({ transactionType: "1", userId: login_user_id, accountId: "", accountName: accountName, accessKeyId: accountKeyId, accessKey: accountKey });
        var accounts = await networkAPI.clouderAPI('CloudAccount', jBody)
        if (accounts.responseCode == 0) {
            loadAccounts();
            resetForm();
        }
        else {

        }
    }
}

async function deleteAccount(id) {
    if (confirm('Are you sure you want to delete this account?')) {
        // Delete account
        const jBody = JSON.stringify({ transactionType: "4", accountId: "" + id + "" });
        var accounts = await networkAPI.clouderAPI('CloudAccount', jBody)
        if (accounts.responseCode == 0) {
            loadAccounts();
        }
        else {

        }
    }
}

async function setDefaultAccount(id) {
    // Delete account
    const jBody = JSON.stringify({ transactionType: "1", userId: login_user_id, accountId: "" + id + "", isDefault: "1" });
    var accounts = await networkAPI.clouderAPI('CloudAccount', jBody)
    if (accounts.responseCode == 0) {
        // loadAccounts();
        login_cloud_account_id = id;
    }
    else {

    }
}

function resetForm() {
    // Reset form fields
    $('#account-id').val('');
    $('#account-name').val('');
    $('#account-key-id').val('');
    $('#account-key').val('');
    $('#btnCreateOrUpdate').html("Add");

}

async function editAccount(id, index) {
    // Load account data and populate form fields
    const jBody = JSON.stringify({ transactionType: "2", accountId: "" + id + "" });
    var account = await networkAPI.clouderAPI('CloudAccount', jBody)
    if (account.responseCode == 0) {
        $('#btnCreateOrUpdate').html("Update(#" + index + ")");
        account = JSON.parse(account.providerResponse)
        console.log(account);
        $('#account-id').val(account.Id);
        $('#account-name').val(account.AccountName);
        $('#account-key-id').val(account.AccessKeyId);
        $('#account-key').val(account.AccessKey);
    }

}