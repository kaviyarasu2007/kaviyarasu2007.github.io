// GitHub API configuration
const GITHUB_USERNAME = 'kaviyarasu2007';

// DOM Elements
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const projectsGrid = document.getElementById('projectsGrid');
const repoCountElement = document.getElementById('repoCount');
const followerCountElement = document.getElementById('followerCount');
const starCountElement = document.getElementById('starCount');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('fa-times'); // Visual change for menu
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Fetch and Inject GitHub Data
async function fetchGitHubData() {
    try {
        // Fetch User Stats
        const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        if (!userResponse.ok) throw new Error('User data fetch failed');
        const userData = await userResponse.json();
        
        // Update Stats UI
        repoCountElement.innerText = userData.public_repos;
        followerCountElement.innerText = userData.followers;

        // Fetch Repositories
        const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
        if (!reposResponse.ok) throw new Error('Repo data fetch failed');
        const reposData = await reposResponse.json();

        // Calculate Total Stars
        let totalStars = 0;
        reposData.forEach(repo => {
            totalStars += repo.stargazers_count;
        });
        starCountElement.innerText = totalStars;

        // Clear loading spinner
        projectsGrid.innerHTML = '';

        // Filter out forks (optional) and grab the top 6 recently updated repos
        const displayRepos = reposData.filter(repo => !repo.fork).slice(0, 6);

        if (displayRepos.length === 0) {
            projectsGrid.innerHTML = '<p style="color:var(--text-light); text-align:center; width:100%;">No public repositories found.</p>';
            return;
        }

        // Generate HTML for each repo
        displayRepos.forEach(repo => {
            const projectCard = `
                <div class="project-card">
                    <div class="project-header">
                        <h3><i class="fas fa-folder-open"></i> ${repo.name}</h3>
                        <span class="project-language">${repo.language || 'Documentation'}</span>
                    </div>
                    <div class="project-body">
                        <p>${repo.description || 'No description provided for this repository.'}</p>
                    </div>
                    <div class="project-stats">
                        <span class="stat"><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                        <span class="stat"><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                        <a href="${repo.html_url}" target="_blank" class="stat"><i class="fab fa-github"></i> Source</a>
                    </div>
                </div>
            `;
            projectsGrid.innerHTML += projectCard;
        });

    } catch (error) {
        console.error('Error fetching data from GitHub:', error);
        projectsGrid.innerHTML = '<p style="color:var(--danger); text-align:center; width:100%;">Failed to load GitHub repositories. Please check your connection or API limits.</p>';
    }
}

// Initialize fetch when page loads
document.addEventListener('DOMContentLoaded', fetchGitHubData);
