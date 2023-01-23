import {
    ButtonGroup,
    Box,
    IconButton,
    RangeSlider,
    RangeSliderFilledTrack,
    RangeSliderThumbProps,
    RangeSliderThumb,
    Center,
    Flex,
    Text,
    RangeSliderTrack

} from "@chakra-ui/react"
import ReactHowler from 'react-howler'
import { useEffect, useRef, useState } from 'react'
import {
    MdShuffle,
    MdSkipPrevious,
    MdSkipNext,
    MdOutlinePlayCircleFilled,
    MdOutlinePauseCircleFilled,
    MdOutlineRepeat
} from 'react-icons/md'

import { useStoreActions } from 'easy-peasy'

const Player = ({songs, activeSong}) => {

    const [playing, setPlaying] = useState(true)
    const [index, setIndex] = useState(0)
    const [seek, setSeek] = useState(0.0)
    const [repeat, setRepeat] = useState(false)
    const [shuffle, setShuffle] = useState(false)
    const [duration, setDuration] = useState(0.0)

    const setPlayState = (value) => {
        setPlaying(value)
    }

    const onShuffle = () => {
        setShuffle((state) => !state)
    }

    const onRepeat = () => {
        setRepeat((state) => !state)
    }


    return (
        <Box>
            <Box>
                {/* <ReactHowler 
                playing={playing}
                src={activeSong?.url}

                /> */}
            </Box>
            <Center color="gray.600">
                <ButtonGroup>
                    <IconButton 
                    outline="none" 
                    variant="link"
                    fontSize="24px"
                    aria-label="shuffle"
                    color={shuffle? 'white': 'gray.600'}
                    onClick={() => onShuffle()}
                    icon={<MdShuffle/>} />
                     <IconButton 
                    outline="none" 
                    variant="link"
                    fontSize="24px"
                    aria-label="skip"
                    icon={<MdSkipPrevious/>} />
                    {playing ? (
                        <IconButton 
                        color="white" 
                        outline="none" 
                        variant="link"
                        fontSize="40px"
                        aria-label="play"
                        icon={<MdOutlinePlayCircleFilled/>} 
                        onClick={()=> setPlayState(false)}/>
                    ) : (
                        <IconButton  
                    outline="none" 
                    variant="link"
                    fontSize="40px"
                    aria-label="pause"
                    icon={<MdOutlinePauseCircleFilled/>} 
                    onClick={()=> setPlayState(true)}/>

                    )}
                     
                     <IconButton 
                    outline="none" 
                    variant="link"
                    fontSize="24px"
                    aria-label="shuffle"
                    icon={<MdSkipNext/>} />
                    <IconButton 
                    outline="none" 
                    variant="link"
                    fontSize="24px"
                    aria-label="repeat"
                    color={repeat ? 'white': 'gray.600'} 
                    onClick={() => onRepeat()}
                    icon={<MdOutlineRepeat/>} />
                    
                </ButtonGroup>
            </Center>
            <Box color="gray.600">
                <Flex justify="center" align="center">
                    <Box width="10%">
                        <Text fontSize="x-small">1:45</Text>
                    </Box>
                    <Box width="80%">
                        <RangeSlider 
                        id="player-range"
                        max={200}
                        min={0}
                        step={0.1}
                        aria-label={['min', 'max']}>
                            <RangeSliderTrack 
                            bg="gray.800">
                                <RangeSliderFilledTrack
                                bg="gray.600" />
                            </RangeSliderTrack>
                            <RangeSliderThumb index={0}/>
                        </RangeSlider>
                    </Box>
                    <Box width="10%" textAlign="right">
                        <Text fontSize="x-small">4:45</Text>
                    </Box>
                </Flex>
            </Box>
        </Box>
    )
}

export default Player