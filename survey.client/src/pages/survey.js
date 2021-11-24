import React from 'react'
import NavigationBar from '../components/NavigationBar';
import Surveys from '../components/Surveys';
import { Container } from 'reactstrap';

export default function survey() {
    return (
        <div>
            <NavigationBar/>
            <Container>
                <Surveys/>
            </Container>
        </div>
    )
}
