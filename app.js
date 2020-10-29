const projectsDOM = document.querySelector('.projectsCenter');

//getting projects
class Projects {
    async getProjects() {
        try {
            let result = await fetch('projects.json');
            let data = await result.json();

            let projectsAll = data.projects;
            projectsAll = projectsAll.map(project => {
                const { id, img, exp, website, github } = project;
                return { img, exp, website, github }
            })
            return projectsAll
        } catch (error) {
            console.log(error);
        }
    }
}


// display projects
class UI {
    displayProjects(projects) {
        let result = '';
        projects.forEach(project => {
            result += `
            <div class="circle2" data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
            </div>
            <div class="container" data-aos="zoom-in-left" data-aos-delay="200" data-aos-easing="ease-in-out">
            <div class="containerOver">
            <img class="portfolioImg" src=${project.img} alt="hotelWorx" />
            <div class="overlay">
            <div class="text">
            <p id="exp"> ${project.exp}</p>
            </br>
            <a target="_blank" title="Visit Website" href=${project.website}>
                <i id="githubLeft" class=" fa fa-globe "></i>
            </a>
            <a href=${project.github} target=" blank " title=" Visit GitHub ">
                <i id="githubLeft" class=" fa fa-github "></i></a>
        </div>
    </div>
</div>
</div>
`
        });
        projectsDOM.innerHTML = result;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const projects = new Projects();
    //get all projects
    projects.getProjects().then(projects => ui.displayProjects(projects));

});


// $("nav").find("a").click(function(e) {
//     e.preventDefault();
//     var section = $(this).attr("href");
//     $("html, body").animate({
//         scrollTop: $(section).offset().top
//     });
// });

$(document).ready(function() {

    //navbar 
    const navSlide = () => {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav-links');
        let navLinks = document.querySelectorAll('.nav-links li');

        burger.addEventListener('click', () => {
            //toogle nav

            nav.classList.toggle('nav-active');
            //animate links

            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = ''
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
                }
            });
            //burger animation
            burger.classList.toggle('toggle');
        })
    }

    navSlide();


    //animated mouse
    let mouseCursor = document.querySelector('.newcursor');
    let navLinks = document.querySelectorAll('.nav-links li');


    let containers = document.querySelectorAll('.photoanimation img');

    window.addEventListener('mousemove', cursor);

    function cursor(e) {
        mouseCursor.style.top = e.pageY + "px";
        mouseCursor.style.left = e.pageX + "px";
    }

    navLinks.forEach(link => {
        link.addEventListener('mouseleave', () => {
            mouseCursor.classList.remove('link-grow');
        });
        link.addEventListener('mouseover', () => {
            mouseCursor.classList.add('link-grow');
        });
    });

    containers.forEach(img => {
        img.addEventListener('mouseleave', () => {
            mouseCursor.classList.remove('link-grow');
        });
        img.addEventListener('mouseover', () => {
            mouseCursor.classList.add('link-grow');
        })
    })

    //animated navbar

    const sections = document.querySelectorAll('section');
    const bubble = document.querySelector('.bubble');
    const colors = ['#a3cf4d', "#a3cf4d", "#a3cf4d", "#a3cf4d"];

    const options = {
        threshold: 0.7
    };

    let observer = new IntersectionObserver(navCheck, options);

    function navCheck(entries) {
        entries.forEach(entry => {
            const className = entry.target.className;
            const activeAnchor = document.querySelector(`[data-page=${className}]`);
            const gradientIndex = entry.target.getAttribute('data-index');
            const coords = activeAnchor.getBoundingClientRect();
            const directions = {
                height: coords.height,
                width: coords.width,
                top: coords.top,
                left: coords.left
            };
            if (entry.isIntersecting) {
                bubble.style.setProperty("left", `${directions.left}px`);
                bubble.style.setProperty("top", `${directions.top}px`);
                bubble.style.setProperty("width", `${directions.width}px`);
                bubble.style.setProperty("height", `${directions.height}px`);
                bubble.style.background = colors[gradientIndex];
            }

        });
    }

    sections.forEach(section => {
        observer.observe(section);
    });

    AOS.init();

});

//typing
const texts = ["HTML, CSS, JavaScript, React.Js!"];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";

(function type() {
    if (count === texts.length) {
        count = 0;
    }
    currentText = texts[count];
    letter = currentText.slice(0, ++index);
    document.querySelector(".typing").textContent = letter;
    if (letter.length === currentText.length) {
        count++;
        index = 0;
    }
    setTimeout(type, 400);

}());