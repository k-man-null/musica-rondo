import {
    Box,
    List,
    ListItem,
    Divider,
    ListIcon,
    Center,
    LinkBox,
    LinkOverlay,

} from '@chakra-ui/layout';

import {
    MdHome,
    MdSearch,
    MdLibraryMusic,
    MdPlaylistAdd,
    MdFavorite
} from 'react-icons/md';

import NextImage from 'next/image';
import NextLink from 'next/link';

const navMenu = [
    {
        name: 'Home',
        icon: MdHome,
        route: '/'
    },
    {
        name: 'Search',
        icon: MdSearch,
        route: '/search'
    },
    {
        name: 'Your Library',
        icon: MdLibraryMusic,
        route: '/library'
    },

]


const musicMenu = [
    {
        name: 'Create Playlist',
        icon: MdPlaylistAdd,
        route: '/'
    },
    {
        name: 'Favorites',
        icon: MdFavorite,
        route: '/favorites'
    },
]

const playLists = new Array(30).fill(1).map((_,i) => `Playlist ${i + 1}`)

const Sidebar = () => {
    return (
        <Box
            width="100%"
            height="calc(100vh - 100px)"
            bg="black"
            paddingX="5px"
            color="gray">
            <Box paddingY="20px" height="100%">
                <Box width="120px" marginBottom="20px" paddingX="20px">
                    <NextImage src="/musica-logo.png" height={180} width={180}></NextImage>
                </Box>
                <Box marginBottom="20px">
                    <List spacing={2}>
                        {navMenu.map(menu => (
                            <ListItem paddingX="20px" fontSize="16px" key={menu.name}>
                                <LinkBox>
                                <NextLink href={menu.route} passHref>
                                    <LinkOverlay>
                                        <ListIcon 
                                        as={menu.icon} 
                                        color="white" 
                                        marginRight="20px"/>
                                        {menu.name}
                                    </LinkOverlay>
                                </NextLink>
                                </LinkBox>
                            </ListItem>
                           )

                        )}
                    </List>
                
                </Box>
                
                <Box marginTop="20px">
                    <List spacing={2}>
                        {musicMenu.map(menu => (
                            <ListItem paddingX="20px" fontSize="16px" key={menu.name}>
                                <LinkBox>
                                <NextLink href={menu.route} passHref>
                                    <LinkOverlay>
                                        <ListIcon 
                                        as={menu.icon}
                                        color="white"
                                        marginRight="20px"
                                        />
                                        {menu.name}
                                    </LinkOverlay>
                                </NextLink>
                                </LinkBox>
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <Divider color="gray.400"></Divider>
                
                <Box height="66%" overflowY="auto" paddingY="20px">
                   <List spacing={2}>
                    {playLists.map(
                        playList => (
                        <ListItem paddingX="20px" key={playList}>
                            <LinkBox>
                            <NextLink href="/">
                                <LinkOverlay>
                                {playList}
                                </LinkOverlay>
                            </NextLink>
                            </LinkBox>
                            
                        </ListItem>
                    ))}
                   </List>
                </Box>
            </Box>
        </Box>
    )
}

export default Sidebar;