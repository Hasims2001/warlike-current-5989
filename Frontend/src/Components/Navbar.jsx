import React from 'react';
import { useState,useEffect } from 'react';
import {
    Image,
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    Input,
} from '@chakra-ui/react';
import logo from "./images/logo.png"
import { HamburgerIcon, CloseIcon, ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { DebounceInput } from 'react-debounce-input';
import { styled } from 'styled-components';
import { useDispatch } from 'react-redux';
import { getAllRecipes } from '../Redux/receipeReducer/action';
import { useNavigate } from 'react-router-dom';
export function Navbar() {
    const { isOpen, onToggle } = useDisclosure();
    const [state, setState] = useState("");
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const [prevScrollpos, setPrevScrollpos] = useState(window.pageYOffset);
    const [navbarTop, setNavbarTop] = useState(0);

    useEffect(()=>{
        dispatch(getAllRecipes(state));
       if(state !== ""){
        navigation("/recipelist");
       }

      
    }, [state]);
    useEffect(() => {
        const handleScroll = () => {
          const currentScrollPos = window.pageYOffset;
          if (prevScrollpos > currentScrollPos) {
            setNavbarTop(0);
          } else {
            setNavbarTop(-110);
          }
          setPrevScrollpos(currentScrollPos);
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, [prevScrollpos]);

    return (
        
        <Box paddingBottom={"120px"}>
            <SPAN>
            <Flex justifyContent={"center"} m={".5rem 0"}>
            <DebounceInput minLength={2}
            debounceTimeout={500}
            placeholder={"Feeling Hungry, Search here...."}
            className='inputBox'
           
            onChange={event => setState(event.target.value)} />
            </Flex>
            </SPAN>
            <Flex
             style={{ top: `${navbarTop}px` }}
             position={"fixed"}
             top={"0"}
             transition={"top 0.3s"}
             zIndex={"5"}
             width={"100%"}
             
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'80px'}
                maxH={"110px"}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}
            >
                <Flex
                    flex={{ base: 1, md: 'auto' }}
                    ml={{ base: -2 }}
                    display={{ base: 'flex', md: 'none' }}
                >
                    <IconButton
                        onClick={onToggle}
                        icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>
                <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
                    <Flex  width={"250px"} h={"100"}
                    mr={{md:"7%",base:"30%"}}
                        textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                        fontFamily={'heading'}
                        color={useColorModeValue('gray.800', 'white')}
                    >
                        <Box  _hover={{cursor:"pointer"}} style={{width:"100%",height:"90%"}}>
                            <Image  h={"100%"} w={"100%"} src={logo} alt="logo" />
                        </Box>
                    </Flex>

                    <Flex justifyContent={"center"} alignItems={"end"} display={{ base: 'none', md: 'flex' }} pb={"1.8%"} ml={10}>
                        <DesktopNav />
                    </Flex>
                </Flex>
                

                <Stack
                // border={"1px solid black"}
                    flex={{ base: 1, md: 0 }}
                    justify={'end'}
                    direction={'row'}
                    spacing={6}
                    h={"100%"}
                    pt={"1.5%"}
                    
                >
                    <Button color={'black'} as={'a'} fontSize={'sm'} fontWeight={400} variant={'link'} href={'#'}>
                        Sign In
                    </Button>
                    <Button
                        as={'a'}
                        display={{ base: 'none', md: 'inline-flex' }}
                        fontSize={'sm'}
                        fontWeight={600}
                        color={'white'}
                        bg={'#e45a05'}
                        href={'#'}
                        _hover={{
                            bg: '#e47a05',
                        }}
                    >
                        Sign Up
                    </Button>
                </Stack>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
        </Box>
    );
}

const DesktopNav = () => {
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');

    return (
        <Stack direction={'row'} spacing={4}>
            {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                    <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger>
                            <Box
                                as="a"
                                p={2}
                                href={navItem.href ?? '#'}
                                fontSize={'sm'}
                                fontWeight={500}
                                color={linkColor}
                                _hover={{
                                    textDecoration: 'none',
                                    color: linkHoverColor,
                                }}
                            >
                                {navItem.label}
                            </Box>
                        </PopoverTrigger>

                        {navItem.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={'xl'}
                                bg={popoverContentBgColor}
                                p={4}
                                rounded={'xl'}
                                minW={'sm'}
                            >
                                <Stack>
                                    {navItem.children.map((child) => (
                                        <DesktopSubNav key={child.label} {...child} />
                                    ))}
                                </Stack>
                            </PopoverContent>
                        )}
                    </Popover>
                </Box>
            ))}
        </Stack>
    );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
    return (
        <Box
            as="a"
            href={href}
            role={'group'}
            display={'block'}
            p={2}
            rounded={'md'}
            _hover={{ bg:'#e45a05' }}
        >
            <Stack direction={'row'} align={'center'}>
                <Box>
                    <Text
                        transition={'all .3s ease'}
                        _groupHover={{ color: 'white' }}
                        fontWeight={500}
                    >
                        {label}
                    </Text>
                    <Text  _groupHover={{ color: 'white' }} fontSize={'sm'}>{subLabel}</Text>
                </Box>
                <Flex
                    transition={'all .3s ease'}
                    transform={'translateX(-10px)'}
                    opacity={0}
                    _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                    justify={'flex-end'}
                    align={'center'}
                    flex={1}
                >
                    <Icon color={'white'} w={5} h={5} as={ChevronRightIcon} />
                </Flex>
            </Stack>
        </Box>
    );
};

const MobileNav = () => {
    return (
        <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    );
};

const MobileNavItem = ({ label, children, href }) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Box
            
                py={2}
                as="a"
                href={href ?? '#'}
                justifyContent="space-between"
                alignItems="center"
                _hover={{
                    textDecoration: 'none',
                }}
            >
                <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        w={6}
                        h={6}
                       
                    />
                )}
            </Box>

            <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    align={'start'}
                >
                    {children &&
                        children.map((child) => (
                            <Box as="a" key={child.label} py={2} href={child.href}>
                                {child.label}
                            </Box>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    );
};

const NAV_ITEMS = [
    {
        label: 'DINNER',
        children: [
            {
                label: 'Explore Design Work',
                subLabel: 'Trending Design to inspire you',
                href: '#',
            },
            {
                label: 'New & Noteworthy',
                subLabel: 'Up-and-coming Designers',
                href: '#',
            },
        ],
    },
    {
        label: 'MEALS',
        children: [
            {
                label: 'Job Board',
                subLabel: 'Find your dream design job',
                href: '#',
            },
            {
                label: 'Freelance Projects',
                subLabel: 'An exclusive list for contract work',
                href: '#',
            },
        ],
    },
    {
        label: 'INGREDIENTS',
        children: [
            {
                label: 'Job Board',
                subLabel: 'Find your dream design job',
                href: '#',
            },
            {
                label: 'Freelance Projects',
                subLabel: 'An exclusive list for contract work',
                href: '#',
            },
        ],
    },
    {
        label: 'OCCATIONS',
        children: [
            {
                label: 'Job Board',
                subLabel: 'Find your dream design job',
                href: '#',
            },
            {
                label: 'Freelance Projects',
                subLabel: 'An exclusive list for contract work',
                href: '#',
            },
        ],
    },
    {
        label: 'CUISINES',
        children: [
            {
                label: 'Job Board',
                subLabel: 'Find your dream design job',
                href: '#',
            },
            {
                label: 'Freelance Projects',
                subLabel: 'An exclusive list for contract work',
                href: '#',
            },
        ],
    },
    {
        label: 'KITCHEN',
        children: [
            {
                label: 'Job Board',
                subLabel: 'Find your dream design job',
                href: '#',
            },
            {
                label: 'Freelance Projects',
                subLabel: 'An exclusive list for contract work',
                href: '#',
            },
        ],
    },
    {
        label: 'NEWS',
        children: [
            {
                label: 'Job Board',
                subLabel: 'Find your dream design job',
                href: '#',
            },
            {
                label: 'Freelance Projects',
                subLabel: 'An exclusive list for contract work',
                href: '#',
            },
        ],
    },
    {
        label: 'ABOUT US',
        href: '#',
    },
];


const SPAN = styled.span`
     .inputBox{
  background-color: white;
  border: 2px solid #C8C8C8;
  border-radius: 5px;
  padding: 7px 10px;
  width: 50%;
z-index: 6;
 }
 .inputBox:focus{
  border: none;
  outline: 2px solid #ff8f49;
 }
`