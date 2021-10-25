import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../hooks/auth';

import SearchContainer from '../Search';

import logo from '../../assets/logo.svg';
import logo3 from '../../assets/logo3.png';
import {
    Nav,
    Container,
    Img,
    ContainerSearch,
    Input,
    ContainerOptions
} from './styles';

import ModalUploadPhoto from '../Modal/ModalUploadPhoto';
import { useSearch } from '../../hooks/search';
import { useFeed } from '../../hooks/feed';

let time = null;

const Header = () => {
    const { user, signOut } = useAuth();
    const { searchAction, setUsers, setLoading, setCountries } = useSearch();
    const [term, setTerm] = useState('');
    const { setFilter } = useFeed();

    useEffect(() => {
        clearTimeout(time);

        if (term.trim()) {
            setLoading(true);
            time = setTimeout(() => {
                searchAction(term);
            }, 1000);
        }

        return () => {
            setCountries([]);
            setUsers([]);
        }
    }, [searchAction, term, setUsers, setLoading, setCountries]);

    const toggleClose = () => {
        setTerm("");
    };

    const filterCountries = () => {
        setFilter("");
    }

    return (
        <Nav>
            <Container>
                <Link to="/">
                    <Img src={logo3} alt="logo" onClick={(e) => filterCountries()} />
                </Link>


                <ContainerSearch>
                    <FaSearch color="#ccc" size={15} />
                    <Input placeholder="Search" value={term} onChange={(e) => setTerm(e.target.value)} />

                    {term.length > 0 && <SearchContainer toggleClose={toggleClose} />}
                </ContainerSearch>

                <ContainerOptions>
                </ContainerOptions>
            </Container>
        </Nav>
    );
}

export default Header;