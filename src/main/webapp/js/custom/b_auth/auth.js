// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCKT2AcERsgMNBdGzSXIL9bEdJZP4qa9cQ",
    authDomain: "com-bereej-clouder.firebaseapp.com",
    databaseURL: "https://com-bereej-clouder.firebaseio.com",
    projectId: "com-bereej-clouder",
    storageBucket: "com-bereej-clouder.appspot.com",
    messagingSenderId: "1048286634826",
    appId: "1:1048286634826:web:2ec9238fe62cf83691d7b3",
    measurementId: "G-G5MT22J430"
};
if (window.location.hostname.includes("test")) {
    firebaseConfig = {
        apiKey: "AIzaSyDfBfJ7IRvL6i6P8P7SxYhn2SZ5CIGTnKw",
        authDomain: "clouder-test.firebaseapp.com",
        databaseURL: "https://clouder-test-default-rtdb.firebaseio.com",
        projectId: "clouder-test",
        storageBucket: "clouder-test.appspot.com",
        messagingSenderId: "1046370318091",
        appId: "1:1046370318091:web:ddec853eda3f031596940e",
        measurementId: "G-R6BJFWJW7N"
    };
}
if (window.location.hostname.includes("demo")) {
    firebaseConfig = {
        apiKey: "AIzaSyCAOD4PbJXdE_y0Pe2eKLO7YmF0j_i1jmw",
        authDomain: "clouder-demo.firebaseapp.com",
        projectId: "clouder-demo",
        storageBucket: "clouder-demo.appspot.com",
        messagingSenderId: "670891567437",
        appId: "1:670891567437:web:b7445bd6b65174cf592f04",
        measurementId: "G-8H4NGK595F"
    };
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
_auth = firebase.auth();
_db = firebase.firestore();

var authProvider = new firebase.auth.GoogleAuthProvider(); // TODO : This is probably never used. Check and remove.
_auth.onAuthStateChanged(async user => {
    console.log('in auth.js user :', user);
    if (user == null) {
        _editorUi.showDialog(new SignInConfirmationDialog(_editorUi).container, 250, 150, true, true, function () {
            showingAbout = false;
        });
        // return;
    }
    else {
        await _saveAccountDetailsToDatabase()
        if (login_cloud_account_id == 0) {
            ui.showDialog(new ConfirmationDialog(ui,null,mxResources.get('confirmationmsg3')).container, 400, 150, true, true, function () {
                showingAbout = false;
            });
        }
        else {
        }
    }


});
// login status change
_auth.onAuthStateChanged(user => {
    if (user) {
        console.log('User has logged in... : ', user);
        updateFirestore(user);
        getCloudAccountAccessCredentials(user);
    }
    else {
        localStorage.clear();
        console.log('User has logged logged out : ', user);
        showSnackbar("Okay, see you soon");
    }
    //SK080223 sign-in sign-out hide 
    if (!user) {
        _editorUi.actions.get('clouderLogin').visible = true;
        _editorUi.actions.get('clouderLogout').visible = false;
    }
    else {
        _editorUi.actions.get('clouderLogin').visible = false;
        _editorUi.actions.get('clouderLogout').visible = true;
    }
    //SK080223 ToDo 
    _editorUi.actions.get('makeInAzure').visible = false;
    _editorUi.actions.get('convertToAzure').visible = false;
    _editorUi.actions.get('makeInGCP').visible = false;
});