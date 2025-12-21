// GitHub API configuration
const GITHUB_USERNAME = 'kaviyarasu2007';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}`;
const GITHUB_REPOS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

// DOM Elements
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const projectsGrid = document.getElementById('projectsGrid');
const repoCountElement = document.getElementById('repoCount');
const starCountElement = document.getElementById('starCount');
const contactForm = document.getElementById('contactForm');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML
