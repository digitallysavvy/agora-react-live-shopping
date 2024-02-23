import React, { useEffect, useRef } from 'react'
import { auth } from './firebase-config'
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
      // {
      //   provider: FacebookAuthProvider.PROVIDER_ID,
      //   scopes: [
      //     'public_profile',
      //     'email',
      //     'user_likes',
      //     'user_friends'
      //   ]
      // },
      // TwitterAuthProvider.PROVIDER_ID,
      {
        provider: GoogleAuthProvider.PROVIDER_ID,
        clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID
      },
      // {
      //   provider: 'microsoft.com',
      //   loginHintKey: 'login_hint'
      // },
      // {
      //   provider: 'apple.com'
      // },
      {
        provider: EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: true,
        signInMethod: 'password'
      },
      firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
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
        uiRef.current = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth)
        console.log(`uiRef.current: ${uiRef.current}`)
      }
      // Start FirebaseUI Auth
      uiRef.current.start('#auth-container', uiConfig)  
    }

    // Clean-up
    return () => uiRef.current && uiRef.current.delete()
  }, [])

  return <div id='auth-container'></div>
}

export default FirebaseAuthUI
