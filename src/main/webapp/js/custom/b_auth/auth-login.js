
const loginForm = document.querySelector('#login-form');
const loginMessage = document.querySelector("#login-message");
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const microsoftAuthProvider = new firebase.auth.OAuthProvider('microsoft.com');
const githubAuthProvider = new firebase.auth.GithubAuthProvider();
const tweeterAuthProvider = new firebase.auth.TwitterAuthProvider();




function getCloudAccountAccessCredentials(user)
{
  
    const cloudAccountsRef = _db.collection('Users').doc(user.uid).collection("CloudAccounts").doc("AWS");
    const doc = cloudAccountsRef.get()
                    .then(doc => {
                        if (!doc.exists) {
                          console.log('No such document!');
                        } else {
                          console.log('Document data:', doc.data());
                        //   console.log("Access key id : ",doc.data().AccessKeyId);
                          localStorage.setItem("AccessKeyId",doc.data().AccessKeyId);
                          localStorage.setItem("AccessKey",doc.data().AccessKey);
                        }
                      })
                      .catch(err => {
                        // console.log('Error getting document', err);//SK150223 lots off consol msg print ..will work on this later
                      });

}

function updateFirestore(user)
{
    _db = firebase.firestore();
    _db.collection("Users").doc(user.uid).set({
        email:user.email,
        id:user.uid,
        displayName:user.displayName,
        emailVerified:user.emailVerified,
        phoneNumber:user.phoneNumber,
        photoURL:user.photoURL,
        providerId:user.providerData[0].providerId,
        providerDisplayName:user.providerData[0].displayName,
        providerPhotoURL:user.providerData[0].photoURL,
        creationTime:user.metadata.creationTime,
        lastSignInTimeFirebase:user.metadata.lastSignInTime,
        lastSignInTime:new Date().toLocaleString('en-DE', { hour12: false}),
        user:JSON.stringify(user)
      }).then( () => {
        console.log('bingo! The firestore document has been created');
      }).catch(err => {
        // console.log(err); //SK150223 lots off consol msg print ..will work on this later
      });
}

// TODO : The code in these logon methods looks pretty similar in each of these functions
// Refactor the various logon method functions/methods/whatever they call :)


function onTweeterSignIn() {
    console.log('Signing in with Tweeter');

    firebase.auth().signInWithPopup(tweeterAuthProvider).then(function (result) {
        console.log('in signInWithPopup().then');
        // This gives you a Google Access Token. You can use it to access the Google API.

        var token = result.credential.accessToken;
        var secret = result.credential.secret;
        // The signed-in user info.
        var user = result.user;

        // ... TODO : implement this (required ?)

        // window.location = '/Dashboard/Dashboard1';
    }).catch(function (error) {
        console.log(error);
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });

}

function onGithubSignIn() {
    console.log('Signing in with Github');

    firebase.auth().signInWithPopup(githubAuthProvider).then(function (result) {
        console.log('in signInWithPopup().then');
        // This gives you a Google Access Token. You can use it to access the Google API.

        var token = result.credential.accessToken;
        console.log('token : ', token);

        // The signed-in user info.
        var user = result.user;

        // ... TODO : implement this (required ?)

        // window.location = '/Dashboard/Dashboard1';
    }).catch(function (error) {
        console.log(error);
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });

}

function onMicrosoftSignIn() {
    console.log('Signing in with Microsoft');

    firebase.auth().signInWithPopup(microsoftAuthProvider).then(function (result) {
        console.log('in signInWithPopup().then');
        // This gives you a Google Access Token. You can use it to access the Google API.

        var token = result.credential.accessToken;
        console.log('token : ', token);

        // The signed-in user info.
        var user = result.user;

        // ... TODO : implement this (required ?)

        // window.location = '/Dashboard/Dashboard1';
    }).catch(function (error) {
        console.log(error);
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });

}

function onGoogleSignIn() {
    console.log('Signing in with Google2');
    

    //auth.signInWithRedirect(provider);

    firebase.auth().signInWithPopup(googleAuthProvider).then(function (result) {
        console.log('in signInWithPopup().then');
        // This gives you a Google Access Token. You can use it to access the Google API.

        var token = result.credential.accessToken;
        console.log('token : ', token);

        // The signed-in user info.
        var user = result.user;

        // ... TODO : implement this (required ?)

        // window.location = '/Dashboard/Dashboard1';
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log(error);
    });
}

function signout() {
    firebase.auth().signOut().then(() => {
        console.log('signed out');
        // window.location = "/Auth/Login";
    })
}



//SK08022023 To Do

// login with email

// // loginForm.addEventListener('submit', (e) => {
// //     //console.log('Checking if username and password is right');

// //     e.preventDefault();                 // God knows what is this line but it's damn useful. Don't dare to remove unless you know what you are doing. Got it, Sudeep ?


// //     // get user info
// //     const email = loginForm['login-email'].value;
// //     const password = loginForm['login-password'].value;

// //     // log the user in

// //     auth.signInWithEmailAndPassword(email, password).then((cred) => {

// //         window.location = "/Dashboard/Dashboard3";

// //         loginForm.reset();
// //     }).catch(err => {
// //         //console.log(err);
        
// //         const errorCode = err['code'];
// //         if (errorCode == 'auth/wrong-password') {
// //             loginMessage.innerHTML = "Oops ! Your login credentials are wrong";

// //         }
// //         else if (errorCode == 'auth/user-not-found')
// //         {
// //             loginMessage.innerHTML = "We don't think that's your user name, is it ?";
// //         }
// //         else {
// //             loginMessage.innerHTML = err['message'];
// //         }
// //         loginMessage.style.display = 'block';
// //         password.value = "";
// //     });

// // });



