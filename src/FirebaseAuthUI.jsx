import React, { useEffect, useRef } from 'react'
import { auth, getFirebaseApp } from './firebase-config'
import { GoogleAuthProvider, EmailAuthProvider, FacebookAuthProvider, TwitterAuthProvider } from 'firebase/auth'
import 'firebaseui/dist/firebaseui.css'
import * as firebaseui from 'firebaseui'

const FirebaseAuthUI = () => {
  // FirebaseUI config
  const uiConfig = {
    'signInFlow': 'popup',              // Display the Provider's sign-in flow in a pop-up
    'signInSuccessUrl': '/dashboard',   // the route to redirect users after login
    'callbacks': {
      // 'signInSuccessWithAuthResult': (authResult, redirtUrl) => {
      //   if(authResult.user) {
      //     handleSignedInUser(authResult.user)
      //   }
      // }
    },
    'signInOptions': [
      {
        provider: FacebookAuthProvider.PROVIDER_ID,
        scopes: [
          'public_profile',
          'email',
          'user_likes',
          'user_friends'
        ]
      },
      TwitterAuthProvider.PROVIDER_ID,
      {
        provider: GoogleAuthProvider.PROVIDER_ID,
        clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID
      },

      {
        provider: EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: true,
        signInMethod: EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD
      },
      {
        provider: 'apple.com'
      }
    ],
    'tosUrl': 'https://www.agora.io/en/terms-of-service/',
    'privacyPolicyUrl': 'https://www.agora.io/en/privacy-policy/',
    'credentialHelper': firebaseui.auth.CredentialHelper.GOOGLE_YOLO
  }

  // UI refernce
  const uiRef = useRef(null)

  useEffect(() =>{
    const initializeFirebaseUI = () => {
      console.log('initialize FirebaseUI')
      if(!uiRef.current) {
        console.log('getUser')
        uiRef.current = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth())
        console.log(`uiRef.current: ${uiRef.current}`)
      }
      // Start FirebaseUI Auth
      uiRef.current.start('#auth-container', uiConfig)  
    }

    // init the ui once firebase is loaded
    if(getFirebaseApp()){
      initializeFirebaseUI()
    }
    // Clean-up
    return () => uiRef.current && uiRef.current.delete()
  }, [])

  return <div id='auth-container'></div>
}

export default FirebaseAuthUI
