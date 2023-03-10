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
import { formatTime } from "../lib/formatters"

const Player = ({songs, activeSong}) => {

    const [playing, setPlaying] = useState(true)
    const [index, setIndex] = useState(
        songs.findIndex((s) => s.id === activeSong.id))
    const [seek, setSeek] = useState(0.0)
    const [repeat, setRepeat] = useState(false)
    const [shuffle, setShuffle] = useState(false)
    const [duration, setDuration] = useState(0.0)
    const [seeking, setIsSeeking] = useState(false)

    const setActiveSong = useStoreActions((state: any) => state.changeActiveSong)
    

    const soundRef = useRef(null)
    const repeatRef = useRef(repeat)

    useEffect(()=> {
        repeatRef.current = repeat
    }, [repeat])

    useEffect(() => {
        let timerId
        if(playing && !seeking) {
            const f = () => {
                setSeek(soundRef.current.seek())
                timerId = requestAnimationFrame(f)
            }

            timerId = requestAnimationFrame(f)
            return () => cancelAnimationFrame(timerId)
        }

        cancelAnimationFrame(timerId)

    }, [playing, seeking])

    useEffect(()=> {

        setActiveSong(songs[index])

    }, [index, setActiveSong, songs])

    const setPlayState = (value) => {
        setPlaying(value)
    }

    const onShuffle = () => {
        setShuffle((state) => !state)
    }

    const onRepeat = () => {
        setRepeat((state) => !state)
    }

    const prevSong = () => {
        setIndex((state) => {
            return state ? state - 1 : songs.length - 1
        })
    }

    const nextSong = () => {
        setIndex((state) => {
            if (shuffle) {
                
                const next = Math.floor(Math.random() * songs.length)
                if(next === state) {
                    return nextSong()
                } return next

            } else {
                return state === songs.length -1 ? 0: state + 1
            }
        })
    }

    const onEnd =  () => {
        if(repeatRef.current) {
            setSeek(0)
           soundRef.current.seek(0) 
        } else {
            nextSong()
        }
    }

    const onLoad = () => {
        const songDuration = soundRef.current.duration()
        setDuration(songDuration)
    }

    const onSeek = (e) => {
        setSeek(parseFloat(e[0]))
        soundRef.current.seek(e[0])
    }


    return (
        <Box>
            <Box>
                <ReactHowler 
                playing={playing}
                src={activeSong?.url}
                ref={soundRef}
                onLoad={onLoad}
                onEnd={onEnd}
                />
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
                    icon={<MdSkipPrevious/>}
                    onClick={prevSong} />
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
                    color="white" 
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
                    aria-label="next"
                    icon={<MdSkipNext/>}
                    onClick={nextSong} />

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
                        <Text fontSize="x-small">{formatTime(seek)}</Text>
                    </Box>
                    <Box width="80%">
                        <RangeSlider 
                        id="player-range"
                        min={0}
                        step={0.1}
                        aria-label={['min', 'max']}
                        max = {duration ? duration.toFixed(2) as unknown as number: 0}
                        onChange={onSeek}
                        value={[seek]}
                        onChangeStart={() => setIsSeeking(true)}
                        onChangeEnd={ () => setIsSeeking(false)}
                        >
                            <RangeSliderTrack 
                            bg="gray.800">
                                <RangeSliderFilledTrack
                                bg="gray.600" />
                            </RangeSliderTrack>
                            <RangeSliderThumb index={0}/>
                        </RangeSlider>
                    </Box>
                    <Box width="10%" textAlign="right">
                        <Text fontSize="x-small">{formatTime(duration)}</Text>
                    </Box>
                </Flex>
            </Box>
        </Box>
    )
}

export default Player