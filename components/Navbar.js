import React from "react";
import { Menu, Container, Icon } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link"; //basically the <a> tag for the next js framework

function Navbar() {
  const router = useRouter();

  const isActive = (route) => router.pathname === route;
  //if we're on login page, the pathname will be /login

  return (
    <Menu fluid borderless>
      <Container text>
        <Link href="/login">
          <Menu.Item header active={isActive("/login")}>
            <Icon size="large" name="sign in"></Icon>
            Login
          </Menu.Item>
        </Link>

        <Link href="/signup">
          <Menu.Item header active={isActive("/signup")}>
            <Icon size="large" name="signup"></Icon>
            Signup
          </Menu.Item>
        </Link>
      </Container>
    </Menu>
  );
}

export default Navbar;
