import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import MapComponent from '../component/MapComponent';
import MapComponent2 from '../component/MapComponent2';

export function Home() {

    let navigate = useNavigate(); 
    const createGroup = () => { 
        navigate('/create-group');
    }
    const joinGroup = () => {
        navigate('/join-group');
    }

    return (
        <Container>
            <Row style={fullHeight()}>
                <Row>
                    <br/>
                </Row>
                <Row>
                    <Col>
                        <h1 style={center()}>
                            pitStop
                        </h1>
                    </Col>
                </Row>
                <Row>
                    {/* <iframe
                        width="600"
                        height="450"
                        // style="border:0"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCQ4bVtRBXal_uIOwwn65474LkjE6WpJ9U
                            &q=Space+Needle,Seattle+WA">
                    </iframe> */}
                    <MapComponent2/>
                </Row>
                <Row>
                    {/* <Col style={center()}>
                        <Row>
                            <Col>
                                <Button style={blackButton()} onClick={createGroup}>
                                    Create a Group
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <br/>
                        </Row>
                        <Row>
                            <Col>
                                <Button style={blackButton()} onClick={joinGroup}>
                                        Join a Group
                                </Button>
                            </Col>
                        </Row>
                    </Col> */}
                </Row>
                {/* <Row style={center()}>
                    <p style={lowerText()}>by brendan carr</p>
                </Row> */}
            </Row>
        </Container>
    )

    function fullHeight() {
        return {
            height: '90vh',
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center'
        }
    }

    function center() {
        return {
            textAlign: 'center',
            justifyContent: 'center'
        }
    }

    function blackButton() {
        return {
            backgroundColor: 'black',
            padding: 20,
            border: 'black',
            width: 155
        }
    }

    function lowerText() {
        return {
            position: 'absolute',
            bottom: '0',
            width: '100%',
            textAlign: 'center'
        }
    }
}