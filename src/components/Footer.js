import React from "react";
import tw from "twin.macro";
import {Container as ContainerBase } from "./misc/Layouts.js"
import { LinkedinOutlined, GithubOutlined, MailOutlined } from "@ant-design/icons";

const Container = tw(ContainerBase)`bg-gray-900 text-gray-100 -mx-8 -mb-8`
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;
const Row = tw.div`flex items-center justify-center flex-col px-8`
const CopyrightText = tw.p`text-center mt-10 font-medium tracking-wide text-sm text-gray-600`

export default function Footer() {
    return <Container style={{"backgroundColor": "rgba(237,242,247,var(--bg-opacity))"}}>
        <Content>
            <Row>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <a className="LinkedIn" href={links.linkedIn}>
                        <LinkedinOutlined />
                    </a>
                    <div style={{margin: "0 40px 0 0"}} />
                    <a className="Github" href={links.github}>
                        <GithubOutlined />
                    </a>
                    <div style={{margin: "0 40px 0 0"}} />
                    <a className="Mail" href={links.email}>
                        <MailOutlined />
                    </a>
                </div>
                <CopyrightText>
                    This site uses  <a href={links.Treact} style={{color: "rgb(100, 21, 255)"}}>Treact</a>,
                    a React theme created by  <a href={links.Owais} style={{color: "rgb(100, 21, 255)"}}>Owais Khan</a>.
                </CopyrightText>
                <CopyrightText>
                    Kenny Le &copy; 2021 <a href={links.CC} style={{color: "rgb(100, 21, 255)"}}>CC BY-NC-SA 4.0</a>
                </CopyrightText>
            </Row>
        </Content>
    </Container>
};

const links = {
    CC: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
    Treact: "https://treact.owaiskhan.me/",
    Owais: "https://owaiskhan.me/",
    linkedIn: "https://www.linkedin.com/in/kmdle/",
    github: "https://github.com/krocketeer",
    email: "mailto:kmdle@uw.edu"
}
