import GradientLayout from '../components/gradientLayout'
import prisma from '../lib/prisma'
import { Box, Flex, Text } from "@chakra-ui/layout" 
import { Image } from "@chakra-ui/react"
import { useMe } from '../lib/hooks'

const Home = ({artists}) => {
  const {user} = useMe() 

  
  return (
    <GradientLayout 
    color="green" 
    subtitle="profile" 
    title={`${user?.firstName} ${user?.lastName}`}
    description={`${user?.playlistCount} public playlists`}
    image="https://avatars.githubusercontent.com/u/74916504?v=4"
    roundImage > 
    <Box color="white" paddingX="40px">
      <Box marginBottom="40px">
        <Text 
        fontSize="2xl"
        fontWeight="bold"
        >
          Top artists this month
        </Text>
        <Text fontSize="md">Only visible to you</Text>
      </Box>
      <Flex>

        {artists.map(artist => (
          <Box paddingX="10px" width="20%">
          <Box bg="gray.900" borderRadius="4px" padding="15px" width="100%">
              <Image 
              borderRadius="100%"
              src="https://placekitten.com/300/300"/>
              <Box marginTop="20px">
                <Text fontSize="large">{artist.name}</Text>
                <Text fontSize="x-small">Artist</Text>
              </Box>
          </Box>
          </Box>
        ))}

      </Flex>
    </Box>
    </GradientLayout>
  )
}


export const getServerSideProps = async () => {

  const artists = await prisma.artist.findMany({})
  
  return {
    props: { artists }
  }
}

export default Home