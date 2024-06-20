document.addEventListener('DOMContentLoaded', function() {
    const optionType = document.querySelector(".select-type");
    const selectButton = optionType.querySelector(".select-btn");
    const options = optionType.querySelectorAll(".option");
    const selectButtonText = optionType.querySelector(".sBtn-text");

    selectButton.addEventListener("click", () => optionType.classList.toggle("active"));

    let selectedOption;
    options.forEach(option => {
        option.addEventListener("click", () => {
            selectedOption = option.querySelector(".option-text").innerText;
            selectButtonText.innerText = selectedOption;
            optionType.classList.remove("active");
        });
    });

    const optionWatch = document.querySelector(".select-watch");
    const selectButtonWatch = optionWatch.querySelector(".select-btn");
    const optionsWatch = optionWatch.querySelectorAll(".option");
    const selectButtonTextWatch = optionWatch.querySelector(".sBtn-text");

    selectButtonWatch.addEventListener("click", () => optionWatch.classList.toggle("active"));

    const firstAppearance = false;
    let selectedOptionWatch;
    optionsWatch.forEach(option => {
        option.addEventListener("click", () => {
            firstAppearance
            selectedOptionWatch = option.querySelector(".option-text").innerText;
            selectButtonTextWatch.innerText = selectedOptionWatch;
            optionWatch.classList.remove("active");
        });
    });

    const optionYear = document.querySelector(".select-year");
    const selectButtonYear = optionYear.querySelector(".select-btn");
    const optionsYear = optionYear.querySelectorAll(".option-year");
    const selectButtonTextYear = optionYear.querySelector(".sBtn-text");

    selectButtonYear.addEventListener("click", () => optionYear.classList.toggle("active"));

    const yearInput = document.getElementById('year');

    yearInput.addEventListener('input', updateYearButtonText);

    let selectedYear;

    function updateYearButtonText() {
        selectedYear = yearInput.value;
        selectButtonTextYear.innerText = `${selectedYear}`;
    }

    const applyButton = document.getElementById('apply-btn');

    if (applyButton) {
        applyButton.addEventListener('click', () => {
            currentPage = window.location.pathname.split('/').pop();

            window.location.href = `${currentPage}?type=${encodeURIComponent(selectedOption)}&watch=${encodeURIComponent(selectedOptionWatch)}&year=${encodeURIComponent(selectedYear)}`;
        });
    } else {
        console.error('Apply button not found!');
    }

    function filterStatisticsBarByYear(year) {
        fetch(`http://127.0.0.1:8081/statisticsByYear?year=${year}`)
        .then(response => response.json())
        .then(data => {
            const items = [];
            const counts = [];
            
            for (const platform in data) {
                items.push(`${platform} movies`);
                counts.push(data[platform].movies);
    
                items.push(`${platform} TV shows`);
                counts.push(data[platform].tvShows);
            }
            
            var data = [
            {
                x: items,
                y: counts,
                type: 'bar'
            }];
            var layout = {
                xaxis: {
                    tickangle: -45,
                    automargin: true
                },
                yaxis: {
                    automargin: true
                },
                margin: {
                    t: 150,
                    b: 20
                },
                title: `Number of movies and tv shows on MTSE platform (${year})`
            };
            Plotly.newPlot('statistics', data, layout);
        })
        .catch(error => console.error('Error fetching statistics:', error));
    }

    function filterStatisticsBarByPlatform(platform) {
        fetch(`http://127.0.0.1:8081/statisticsByPlatform?platform=${platform}`)
        .then(response => response.json())
        .then(data => {
            const items = [];
            const counts = [];
            
            items.push(`${platform} movies`);
            counts.push(data.movies);

            items.push(`${platform} tvShows`);
            counts.push(data.tvShows);
            
            var data = [
            {
                x: items,
                y: counts,
                type: 'bar'
            }];
            var layout = {
                xaxis: {
                    tickangle: -45,
                    automargin: true
                },
                yaxis: {
                    automargin: true
                },
                margin: {
                    t: 150,
                    b: 20
                },
                title: `Number of movies and tv shows on MTSE platform (${platform})`
            };
            Plotly.newPlot('statistics', data, layout);
        })
        .catch(error => console.error('Error fetching statistics:', error));
    }

    function filterStatisticsBarByPlatformAndYear(platform, year) {
        fetch(`http://127.0.0.1:8081/statisticsByPlatformAndYear?platform=${platform}&year=${year}`)
        .then(response => response.json())
        .then(data => {
            const items = [];
            const counts = [];
            
            items.push(`${platform} movies`);
            counts.push(data.movies);

            items.push(`${platform} tvShows`);
            counts.push(data.tvShows);
            
            var data = [
            {
                x: items,
                y: counts,
                type: 'bar'
            }];
            var layout = {
                xaxis: {
                    tickangle: -45,
                    automargin: true
                },
                yaxis: {
                    automargin: true
                },
                margin: {
                    t: 150,
                    b: 20
                },
                title: `Number of movies and tv shows on MTSE platform (${platform}, ${year})`
            };
            Plotly.newPlot('statistics', data, layout);
        })
        .catch(error => console.error('Error fetching statistics:', error));
    }
    
    function filterStatisticsPieByYear(year) {
        fetch(`http://127.0.0.1:8081/statisticsByYear?year=${year}`)
        .then(response => response.json())
        .then(data => {
            const items = [];
            const counts = [];
    
            for (const platform in data) {
                items.push(`${platform} movies`);
                counts.push(data[platform].movies);
    
                items.push(`${platform} TV shows`);
                counts.push(data[platform].tvShows);
            }
            
            var data = [
                {
                    labels: items,
                    values: counts,
                    type: 'pie'
                }
            ];
            
            var layout = {
                title: `Movies and tv shows on MTSE platform (${year})`
            };
                
            Plotly.newPlot('statistics', data, layout);
        });
    }

    function filterStatisticsPieByPlatform(platform) {
        fetch(`http://127.0.0.1:8081/statisticsByPlatform?platform=${platform}`)
        .then(response => response.json())
        .then(data => {
            const items = [];
            const counts = [];
    
            items.push(`${platform} movies`);
            counts.push(data.movies);

            items.push(`${platform} tvShows`);
            counts.push(data.tvShows);
            
            var data = [
                {
                    labels: items,
                    values: counts,
                    type: 'pie'
                }
            ];
            
            var layout = {
                title: `Movies and tv shows on MTSE platform (${platform})`
            };
                
            Plotly.newPlot('statistics', data, layout);
        });
    }
    
    function filterStatisticsPieByPlatformAndYear(platform, year) {
        fetch(`http://127.0.0.1:8081/statisticsByPlatformAndYear?platform=${platform}&year=${year}`)
        .then(response => response.json())
        .then(data => {
            const items = [];
            const counts = [];
    
            items.push(`${platform} movies`);
            counts.push(data.movies);

            items.push(`${platform} tvShows`);
            counts.push(data.tvShows);
            
            var data = [
                {
                    labels: items,
                    values: counts,
                    type: 'pie'
                }
            ];
            
            var layout = {
                title: `Movies and tv shows on MTSE platform (${platform}, ${year})`
            };
                
            Plotly.newPlot('statistics', data, layout);
        });
    }
    

    function filterStatisticsLineByYear(year) {
        fetch(`http://127.0.0.1:8081/statisticsByYear?year=${year}`)
        .then(response => response.json())
        .then(data => {
            const items = [];
            const counts = [];
    
            for (const platform in data) {
                items.push(`${platform} movies`);
                counts.push(data[platform].movies);
    
                items.push(`${platform} TV shows`);
                counts.push(data[platform].tvShows);
            }
    
            var data = [
                {
                    x: items,
                    y: counts,
                    mode: 'lines+markers',
                    type: 'scatter',
                    line: {
                        color: 'blue',
                        width: 2,
                    },
                    marker: {
                        symbol: 'circle',
                        size: 6,
                        color: 'blue',
                    },
                },
            ];
            var layout = {
                xaxis: {
                    title: 'Movies/Tv Shows',
                    tickangle: -45,
                    automargin: true,
                },
                yaxis: {
                    title: 'Number of movies/tv shows',
                },
                margin: {
                    t: 150,
                    b: 200
                },
    
            // plot_bgcolor: "rgba(0, 0, 0, 0)",
            // paper_bgcolor: "rgba(0, 0, 0, 0)",
                title: `(${year})`
            };
            
            Plotly.newPlot('statistics', data, layout);
        });
    }

    function filterStatisticsLineByPlatform(platform) {
        fetch(`http://127.0.0.1:8081/statisticsByPlatform?platform=${platform}`)
        .then(response => response.json())
        .then(data => {
            const items = [];
            const counts = [];
    
            items.push(`${platform} movies`);
            counts.push(data.movies);

            items.push(`${platform} tvShows`);
            counts.push(data.tvShows);
    
            var data = [
                {
                    x: items,
                    y: counts,
                    mode: 'lines+markers',
                    type: 'scatter',
                    line: {
                        color: 'blue',
                        width: 2,
                    },
                    marker: {
                        symbol: 'circle',
                        size: 6,
                        color: 'blue',
                    },
                },
            ];
            var layout = {
                xaxis: {
                    title: 'Movies/Tv Shows',
                    tickangle: -45,
                    automargin: true,
                },
                yaxis: {
                    title: 'Number of movies/tv shows',
                },
                margin: {
                    t: 150,
                    b: 200
                },
    
            // plot_bgcolor: "rgba(0, 0, 0, 0)",
            // paper_bgcolor: "rgba(0, 0, 0, 0)",
                title: `(${platform})`
            };
            
            Plotly.newPlot('statistics', data, layout);
        });
    }

    function filterStatisticsLineByPlatformAndYear(platform, year) {
        fetch(`http://127.0.0.1:8081/statisticsByPlatformAndYear?platform=${platform}&year=${year}`)
        .then(response => response.json())
        .then(data => {
            const items = [];
            const counts = [];
    
            items.push(`${platform} movies`);
            counts.push(data.movies);

            items.push(`${platform} tvShows`);
            counts.push(data.tvShows);
    
            var data = [
                {
                    x: items,
                    y: counts,
                    mode: 'lines+markers',
                    type: 'scatter',
                    line: {
                        color: 'blue',
                        width: 2,
                    },
                    marker: {
                        symbol: 'circle',
                        size: 6,
                        color: 'blue',
                    },
                },
            ];
            var layout = {
                xaxis: {
                    title: 'Movies/Tv Shows',
                    tickangle: -45,
                    automargin: true,
                },
                yaxis: {
                    title: 'Number of movies/tv shows',
                },
                margin: {
                    t: 150,
                    b: 200
                },
    
            // plot_bgcolor: "rgba(0, 0, 0, 0)",
            // paper_bgcolor: "rgba(0, 0, 0, 0)",
                title: `(${platform}, ${year})`
            };
            
            Plotly.newPlot('statistics', data, layout);
        });
    }

    function exportAsCSVByYear(year) {
        fetch(`http://127.0.0.1:8081/statisticsByYear?year=${year}`)
        .then(response => response.json())
        .then(data => {
            const items = [];
            const counts = [];

            for (const platform in data) {
                items.push(`${platform} movies`);
                counts.push(data[platform].movies);
    
                items.push(`${platform} TV shows`);
                counts.push(data[platform].tvShows);
            }

            const csvContent = "data:text/csv;charset=utf-8," + [
                ['Platorm Movie/TvShow', 'Number of titles'],
                ...items.map((item, index) => [item, counts[index]])
                .map(row => row.map(field => `"${field}"`).join(',')) // Escape fields with double quotes
            ].join('\n');
    
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "statistics.csv");
            document.body.appendChild(link); // Required for Firefox
            link.click();
            document.body.removeChild(link); // Clean up the link element
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }
    

    function exportAsCSVByPlatform(platform) {
        fetch(`http://127.0.0.1:8081/statisticsByPlatform?platform=${platform}`)
        .then(response => response.json())
        .then(data => {
            const items = [];
            const counts = [];
            
            items.push(`${platform} movies`);
            counts.push(data.movies);

            items.push(`${platform} tvShows`);
            counts.push(data.tvShows);

            const csvContent = "data:text/csv;charset=utf-8," + [
                ['Platorm Movie/TvShow', 'Number of titles'],
                ...items.map((item, index) => [item, counts[index]])
                .map(row => row.map(field => `"${field}"`).join(',')) // Escape fields with double quotes
            ].join('\n');
    
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "statistics.csv");
            document.body.appendChild(link); // Required for Firefox
            link.click();
            document.body.removeChild(link); // Clean up the link element
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    function exportAsCSVByPlatformAndYear(platform, year) {
        fetch(`http://127.0.0.1:8081/statisticsByPlatformAndYear?platform=${platform}&year=${year}`)
        .then(response => response.json())
        .then(data => {
            const items = [];
            const counts = [];
            
            items.push(`${platform} movies`);
            counts.push(data.movies);

            items.push(`${platform} tvShows`);
            counts.push(data.tvShows);

            const csvContent = "data:text/csv;charset=utf-8," + [
                ['Platorm Movie/TvShow', 'Number of titles'],
                ...items.map((item, index) => [item, counts[index]])
                .map(row => row.map(field => `"${field}"`).join(',')) // Escape fields with double quotes
            ].join('\n');
    
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "statistics.csv");
            document.body.appendChild(link); // Required for Firefox
            link.click();
            document.body.removeChild(link); // Clean up the link element
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    function exportAsWebP() {
        Plotly.toImage('statistics', { format: 'webp', width: 800, height: 600 })
            .then(function (url) {
                const link = document.createElement('a');
                link.href = url;
                link.download = 'statistics.webp';
                document.body.appendChild(link); // Required for Firefox
                link.click();
                document.body.removeChild(link); // Clean up the link element
            })
            .catch(function (error) {
                console.error('Error exporting statistics as WebP:', error);
            });
    }
    
    function exportAsSVG() {
        Plotly.downloadImage('statistics', { format: 'svg', width: 800, height: 600, filename: 'statistics' })
            .catch(function (error) {
                console.error('Error exporting chart as SVG:', error);
            });
    }

    document.getElementById('export-webp').addEventListener('click', exportAsWebP);
    
    document.getElementById('export-svg').addEventListener('click', exportAsSVG);
    

    const urlParams = new URLSearchParams(window.location.search);
    let typeOption = urlParams.get('type');
    let yearOption = urlParams.get('year');
    let watchOption = urlParams.get('watch');

    console.log(yearOption);

    let filteredUrl = 'http://127.0.0.1:8081/';

    if (watchOption !== null && watchOption !== 'undefined' && yearOption !== null && yearOption !== 'undefined') {
        filteredUrl += `statisticsByPlatformAndYear?watch=${encodeURIComponent(watchOption)}&year=${encodeURIComponent(yearOption)}`;
    } else if (watchOption !== null && watchOption !== 'undefined') {
        filteredUrl += `statisticsByPlatform?watch=${encodeURIComponent(watchOption)}`;
    } else if (yearOption !== null && yearOption !== 'undefined') {
        filteredUrl+= `statisticsByYear/year=${encodeURIComponent(yearOption)}`;
    }
    

    console.log(filteredUrl);

    console.log(typeOption);
    
    if(typeOption !== null && typeOption !== 'undefined') {
        if(typeOption === 'Bar') {
            if(watchOption !== null && watchOption !== 'undefined' && yearOption !== null && yearOption !== 'undefined') {
                const year = parseInt(yearOption, 10);
                filterStatisticsBarByPlatformAndYear(watchOption, year);
            } else if(yearOption !== null && yearOption !== 'undefined') {
                const year = parseInt(yearOption, 10);
                filterStatisticsBarByYear(year);
            } else if(watchOption !== null && watchOption !== 'undefined') {
                filterStatisticsBarByPlatform(watchOption);
            } else {
                const max = 2021;
                const min = 1925;
                const randomYear = Math.floor(Math.random() * (max - min + 1)) + min;
                filterStatisticsBarByYear(randomYear);
            }
        } else if(typeOption === 'Pie') {
            if(watchOption !== null && watchOption !== 'undefined' && yearOption !== null && yearOption !== 'undefined') {
                const year = parseInt(yearOption, 10);
                filterStatisticsPieByPlatformAndYear(watchOption, year);
            } else if(yearOption !== null && yearOption !== 'undefined') {
                const year = parseInt(yearOption, 10);
                filterStatisticsPieByYear(year);
            } else if(watchOption !== null && watchOption !== 'undefined') {
                filterStatisticsPieByPlatform(watchOption);
            } else {
                const max = 2021;
                const min = 1925;
                const randomYear = Math.floor(Math.random() * (max - min + 1)) + min;
                filterStatisticsPieByYear(randomYear);
            }
        } else if(typeOption === 'Line') {
            if(watchOption !== null && watchOption !== 'undefined' && yearOption !== null && yearOption !== 'undefined') {
                const year = parseInt(yearOption, 10);
                filterStatisticsLineByPlatformAndYear(watchOption, year);
            } else if(yearOption !== null && yearOption !== 'undefined') {
                const year = parseInt(yearOption, 10);
                filterStatisticsLineByYear(year);
            } else if(watchOption !== null && watchOption !== 'undefined') {
                filterStatisticsLineByPlatform(watchOption);
            } else {
                const max = 2021;
                const min = 1925;
                const randomYear = Math.floor(Math.random() * (max - min + 1)) + min;
                filterStatisticsLineByYear(randomYear);
            }
        }
    } else {
        if(watchOption !== null && watchOption !== 'undefined' && yearOption !== null && yearOption !== 'undefined') {
            const year = parseInt(yearOption, 10);
            filterStatisticsBarByPlatformAndYear(watchOption, year);
        } else if(yearOption !== null && yearOption !== 'undefined') {
            const year = parseInt(yearOption, 10);
            filterStatisticsBarByYear(year);
        } else if(watchOption !== null && watchOption !== 'undefined') {
            filterStatisticsBarByPlatform(watchOption);
        } else {
            const max = 2021;
            const min = 1925;
            const randomYear = Math.floor(Math.random() * (max - min + 1)) + min;
            filterStatisticsBarByYear(randomYear);
        }
    }

});