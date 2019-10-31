# Turing Front-end Challenge Template

## onGet Fork

I am solving this challenge using onGet, to show how easy and convenient it becomes.

The original can be found [here](https://github.com/TuringCom/frontend-challenge-template-2)

## Important Note
Do not try to use this in the Turing selection process. They are going to notice.

## Introduction

> **Turing Front-end App Challenge template** is an e-commerce application template built using React that enables users shop for goods in the plaform.

The App has been built using React.

The original Template used:

* Redux
* Redux Saga

They said that the app uses and advanced redux structure, but it really means a very bloated and ugly one.

The new template uses:

* onGet

All components simply listen to the resources they need, and update them as they need.
The UI is state driven.

It uses beforeSet y afterSet, to make the user resource call the server to login/register.
It uses beforeRefresh to includes the USER-KEY header when needed.
