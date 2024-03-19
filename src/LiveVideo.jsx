import { 
  useLocalCameraTrack, 
  useLocalMicrophoneTrack, 
  usePublish, 
  useJoin,
  useRemoteAudioTracks, 
  useRemoteUsers,
  RemoteUser,
  LocalUser,
} from "agora-rtc-react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const LiveVideo = () => {

  const appId = '' 
  const {channelName} = useParams() // get channel name from url

  // track connection state
  const [activeConnection, setActiveConnection] = useState(true)

  // track mic and camera states
  const [micOn, setMicOn] = useState(true)
  const [cameraOn, setCameraOn] = useState(true)

  // get the local video and mic tracks to innitialize the devices
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn)
  const { localCameraTrack } = useLocalCameraTrack(cameraOn)
  usePublish([localMicrophoneTrack, localCameraTrack])

  // get the remote users and their audio tracks
  const remoteUsers = useRemoteUsers()
  const { audioTracks } = useRemoteAudioTracks(remoteUsers)

  // join the channel
  useJoin({
      appid: appId,
      channel: channelName,
      token: null,
      }, 
      activeConnection,
  )

  // play remote audio
  audioTracks.map((track) => track.play())

  // browser navigation
  const navigate = useNavigate()

  return(
      <>
          {/* grid of remote video streams */}
          <div id='remoteVideoGrid'>
              {
                  // initialize each remote stream using the RemoteUser componenet
                  remoteUsers.map((user) => (
                      <div key={user.uid} className="remoteVideoContainer">
                          <RemoteUser user={user} />
                      </div>
                  ))
              }
          </div>
          {/* local user */}
          <div id='localVideo'>
              <LocalUser
                  audioTrack={localMicrophoneTrack}
                  videoTrack={localCameraTrack}
                  cameraOn={cameraOn}
                  micOn={micOn}
                  playAudio={micOn}
                  playVideo={cameraOn}
               />
              {/* media controls */}
              <div id='controlsToolbar'>
                  <div id='mediaControls'>
                      {/* button for mic toggle */}
                      <button className="btn" onClick={() => setMicOn(a => !a)}>
                          Mic
                      </button>
                      {/* button for camera toggle */}
                      <button className="btn" onClick={() => setCameraOn(a => !a)}>
                          Camera
                      </button>
                  </div>
                  {/* button to disconnect */}
                  <button id="endConnection" onClick={() => {
                      setActiveConnection(false)
                      // navigate back to root
                      navigate('/')
                  }}>
                      Disconnect
                  </button>
              </div>
          </div>
      </>
  )
}