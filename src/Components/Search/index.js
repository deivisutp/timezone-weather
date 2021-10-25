import React from 'react';
import { useSearch } from '../../hooks/search';
import Profile from '../Profile';

import Spinner from '../Spinner';

import {
    Container,
    ContainerResult,
    ContainerProfile,
    ContainerEmpty
} from './styles';

const SearchContainer = ({ toggleClose }) => {
    const { loading, countries } = useSearch();

    return (
        <Container>
            {loading ? (
                <Spinner style={{ marginTop: "10px" }} />
            ) : (
                <ContainerResult>
                    {countries.length > 0 ? (
                        countries.map((country) => (
                            <ContainerProfile key={country.photo.country_name + "searchid"} onClick={toggleClose}>
                                <Profile
                                    direction="row"
                                    img={country.photo.photo_url}
                                    username={country.photo.country_name}
                                    name={country.photo.body}
                                />
                            </ContainerProfile>
                        ))
                    ) : (
                        <ContainerEmpty>
                            <p>Have no results</p>
                        </ContainerEmpty>
                    )}
                </ContainerResult>
            )}
        </Container>
    );
}

export default React.memo(SearchContainer);