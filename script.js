//your code here
let currentPageNumber = 1;

      const fetchIssues = async (pageNumber) => {
        const url = `https://api.github.com/repositories/1296269/issues?page=${pageNumber}&per_page=5`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
      }

      const displayIssues = (issues) => {
        const issuesList = document.getElementById('issues');
        issuesList.innerHTML = '';
        issues.forEach((issue) => {
          const issueName = issue.title;
          const issueListItem = document.createElement('li');
          issueListItem.textContent = issueName;
          issuesList.appendChild(issueListItem);
        });
      }

      const loadPage = async (pageNumber) => {
        const issues = await fetchIssues(pageNumber);
        displayIssues(issues);
        document.querySelector('h1').textContent = `Page number ${pageNumber}`;
        currentPageNumber = pageNumber;
      }

      const loadNextPage = () => {
        const nextPageNumber = currentPageNumber + 1;
        loadPage(nextPageNumber);
      }

      const loadPrevPage = () => {
        if (currentPageNumber > 1) {
          const prevPageNumber = currentPageNumber - 1;
          loadPage(prevPageNumber);
        }
      }

      document.getElementById('load_next').addEventListener('click', loadNextPage);
      document.getElementById('load_prev').addEventListener('click', loadPrevPage);

      loadPage(currentPageNumber);
