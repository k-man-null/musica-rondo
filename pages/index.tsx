import Head from 'next/head'
import Image from 'next/image'
import GradientLayout from '../components/gradientLayout'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <GradientLayout 
    color="green" 
    subtitle="profile" 
    title="Bill Konchellah"
    description="15 public playlists"
    image="https://avatars.githubusercontent.com/u/74916504?v=4"
    roundImage>
      <div>Homepage</div>
    </GradientLayout>
  )
}

