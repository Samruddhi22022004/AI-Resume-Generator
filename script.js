"use strict";

/* =========================================================
AI RESUME GENERATOR
Main JavaScript
========================================================= */

/* =========================================================
STORAGE
========================================================= */

const THEME_STORAGE_KEY = "aiResumeGeneratorTheme";

/* =========================================================
DOM ELEMENTS
========================================================= */

const resumeForm = document.getElementById("resumeForm");

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

const addEducationBtn = document.getElementById("addEducationBtn");
const addProjectBtn = document.getElementById("addProjectBtn");
const addExperienceBtn = document.getElementById("addExperienceBtn");
const addCertificationBtn = document.getElementById("addCertificationBtn");

const educationContainer = document.getElementById("educationContainer");
const projectsContainer = document.getElementById("projectsContainer");
const experienceContainer = document.getElementById("experienceContainer");
const certificationsContainer = document.getElementById("certificationsContainer");

const clearFormBtn = document.getElementById("clearFormBtn");
const generateResumeBtn = document.getElementById("generateResumeBtn");
const printResumeBtn = document.getElementById("printResumeBtn");

const resumeEmpty = document.getElementById("resumeEmpty");
const resumeDocument = document.getElementById("resumeDocument");

/* =========================================================
INITIALIZATION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

loadTheme();

setupEventListeners();

});

/* =========================================================
EVENT LISTENERS
========================================================= */

function setupEventListeners() {

if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
}


if (resumeForm) {
    resumeForm.addEventListener("submit", function (event) {

        event.preventDefault();

        generateResume();

    });
}


if (addEducationBtn) {
    addEducationBtn.addEventListener("click", addEducation);
}


if (addProjectBtn) {
    addProjectBtn.addEventListener("click", addProject);
}


if (addExperienceBtn) {
    addExperienceBtn.addEventListener("click", addExperience);
}


if (addCertificationBtn) {
    addCertificationBtn.addEventListener("click", addCertification);
}


if (clearFormBtn) {
    clearFormBtn.addEventListener("click", clearForm);
}


if (printResumeBtn) {
    printResumeBtn.addEventListener("click", printResume);
}

}

/* =========================================================
DARK MODE
========================================================= */

function toggleTheme() {


document.body.classList.toggle("dark-mode");

const isDarkMode = document.body.classList.contains("dark-mode");

localStorage.setItem(
    THEME_STORAGE_KEY,
    isDarkMode ? "dark" : "light"
);

updateThemeIcon(isDarkMode);


}

function loadTheme() {

const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

    updateThemeIcon(true);

} else {

    document.body.classList.remove("dark-mode");

    updateThemeIcon(false);

}

}

function updateThemeIcon(isDarkMode) {

if (!themeIcon) {
    return;
}

if (isDarkMode) {

    themeIcon.className = "bi bi-sun-fill";

    themeToggle.setAttribute(
        "aria-label",
        "Switch to light mode"
    );

} else {

    themeIcon.className = "bi bi-moon-fill";

    themeToggle.setAttribute(
        "aria-label",
        "Switch to dark mode"
    );

}

}

/* =========================================================
GENERATE RESUME
========================================================= */

function generateResume() {

const fullName = getValue("fullName");

const email = getValue("email");

if (!fullName || !email) {

    alert(
        "Please enter your full name and email address."
    );

    return;

}


generateResumeBtn.disabled = true;

generateResumeBtn.innerHTML =
    '<i class="bi bi-hourglass-split"></i> Generating...';


setTimeout(function () {

    try {

        generatePersonalInformation();

        generateSummary();

        generateEducation();

        generateSkills();

        generateProjects();

        generateExperience();

        generateCertifications();


        resumeEmpty.classList.add("d-none");

        resumeDocument.classList.remove("d-none");

        printResumeBtn.disabled = false;


        resumeDocument.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });


    } catch (error) {

        console.error(
            "Resume generation error:",
            error
        );

        alert(
            "Something went wrong while generating the resume. Please try again."
        );

    } finally {

        generateResumeBtn.disabled = false;

        generateResumeBtn.innerHTML =
            '<i class="bi bi-magic"></i> Generate Resume';

    }

}, 600);

}

/* =========================================================
PERSONAL INFORMATION
========================================================= */

function generatePersonalInformation() {

const fullName = getValue("fullName");

const professionalTitle = getValue(
    "professionalTitle"
);

const email = getValue("email");

const phone = getValue("phone");

const location = getValue("location");

const linkedin = getValue("linkedin");

const github = getValue("github");


setText(
    "resumeName",
    fullName || "Your Name"
);


setText(
    "resumeTitle",
    professionalTitle || "Professional"
);


updateContactItem(
    "resumeEmailWrapper",
    "resumeEmail",
    email
);


updateContactItem(
    "resumePhoneWrapper",
    "resumePhone",
    phone
);


updateContactItem(
    "resumeLocationWrapper",
    "resumeLocation",
    location
);


updateContactItem(
    "resumeLinkedinWrapper",
    "resumeLinkedin",
    linkedin,
    true
);


updateContactItem(
    "resumeGithubWrapper",
    "resumeGithub",
    github,
    true
);

}

/* =========================================================
SUMMARY
========================================================= */

function generateSummary() {

const summary = getValue("summary");

const section =
    document.getElementById(
        "resumeSummarySection"
    );

const summaryElement =
    document.getElementById(
        "resumeSummary"
    );


if (!summary) {

    section.classList.add("d-none");

    summaryElement.textContent = "";

    return;

}


section.classList.remove("d-none");

summaryElement.textContent = summary;

}

/* =========================================================
EDUCATION
========================================================= */

function generateEducation() {

const educationItems =
    document.querySelectorAll(
        ".education-item"
    );

const resumeEducation =
    document.getElementById(
        "resumeEducation"
    );

const section =
    document.getElementById(
        "resumeEducationSection"
    );


resumeEducation.innerHTML = "";


let hasEducation = false;


educationItems.forEach(function (item) {

    const degree =
        getElementValue(
            item,
            ".education-degree"
        );

    const institution =
        getElementValue(
            item,
            ".education-institution"
        );

    const year =
        getElementValue(
            item,
            ".education-year"
        );

    const grade =
        getElementValue(
            item,
            ".education-grade"
        );


    if (
        !degree &&
        !institution &&
        !year &&
        !grade
    ) {
        return;
    }


    hasEducation = true;


    const educationHTML = document.createElement(
        "div"
    );

    educationHTML.className = "resume-item";


    educationHTML.innerHTML =
        '<div class="resume-item-header">' +
            '<div>' +
                '<h4>' +
                    escapeHTML(degree || "Education") +
                '</h4>' +

                (
                    institution
                        ? '<div class="resume-institution">' +
                            escapeHTML(institution) +
                          '</div>'
                        : ""
                ) +
            '</div>' +

            (
                year || grade
                    ? '<div class="resume-date">' +
                        escapeHTML(
                            [year, grade]
                                .filter(Boolean)
                                .join(" • ")
                        ) +
                      '</div>'
                    : ""
            ) +

        '</div>';


    resumeEducation.appendChild(
        educationHTML
    );

});


if (hasEducation) {

    section.classList.remove("d-none");

} else {

    section.classList.add("d-none");

}

}

/* =========================================================
SKILLS
========================================================= */

function generateSkills() {

const skillsValue =
    getValue("skills");

const resumeSkills =
    document.getElementById(
        "resumeSkills"
    );

const section =
    document.getElementById(
        "resumeSkillsSection"
    );


resumeSkills.innerHTML = "";


if (!skillsValue) {

    section.classList.add("d-none");

    return;

}


const skills = skillsValue
    .split(",")
    .map(function (skill) {
        return skill.trim();
    })
    .filter(function (skill) {
        return skill.length > 0;
    });


if (skills.length === 0) {

    section.classList.add("d-none");

    return;

}


section.classList.remove("d-none");


skills.forEach(function (skill) {

    const badge =
        document.createElement("span");

    badge.className = "skill-badge";

    badge.textContent = skill;

    resumeSkills.appendChild(badge);

});

}

/* =========================================================
PROJECTS
========================================================= */

function generateProjects() {

const projectItems =
    document.querySelectorAll(
        ".project-item"
    );

const resumeProjects =
    document.getElementById(
        "resumeProjects"
    );

const section =
    document.getElementById(
        "resumeProjectsSection"
    );


resumeProjects.innerHTML = "";


let hasProjects = false;


projectItems.forEach(function (item) {

    const name =
        getElementValue(
            item,
            ".project-name"
        );

    const description =
        getElementValue(
            item,
            ".project-description"
        );

    const technologies =
        getElementValue(
            item,
            ".project-technologies"
        );


    if (
        !name &&
        !description &&
        !technologies
    ) {
        return;
    }


    hasProjects = true;


    const projectElement =
        document.createElement("div");

    projectElement.className =
        "resume-item";


    let projectHTML =
        '<div class="resume-item-header">' +
            '<div>' +
                '<h4>' +
                    escapeHTML(
                        name || "Project"
                    ) +
                '</h4>' +
            '</div>' +
        '</div>';


    if (description) {

        projectHTML +=
            '<p class="resume-item-description">' +
                escapeHTML(description) +
            '</p>';

    }


    if (technologies) {

        projectHTML +=
            '<p class="resume-item-description">' +
                '<strong>Technologies:</strong> ' +
                escapeHTML(technologies) +
            '</p>';

    }


    projectElement.innerHTML =
        projectHTML;


    resumeProjects.appendChild(
        projectElement
    );

});


if (hasProjects) {

    section.classList.remove("d-none");

} else {

    section.classList.add("d-none");

}

}

/* =========================================================
EXPERIENCE
========================================================= */

function generateExperience() {

const experienceItems =
    document.querySelectorAll(
        ".experience-item"
    );

const resumeExperience =
    document.getElementById(
        "resumeExperience"
    );

const section =
    document.getElementById(
        "resumeExperienceSection"
    );


resumeExperience.innerHTML = "";


let hasExperience = false;


experienceItems.forEach(function (item) {

    const title =
        getElementValue(
            item,
            ".experience-title"
        );

    const company =
        getElementValue(
            item,
            ".experience-company"
        );

    const start =
        getElementValue(
            item,
            ".experience-start"
        );

    const end =
        getElementValue(
            item,
            ".experience-end"
        );

    const description =
        getElementValue(
            item,
            ".experience-description"
        );


    if (
        !title &&
        !company &&
        !start &&
        !end &&
        !description
    ) {
        return;
    }


    hasExperience = true;


    const experienceElement =
        document.createElement("div");

    experienceElement.className =
        "resume-item";


    let experienceHTML =
        '<div class="resume-item-header">' +

            '<div>' +

                '<h4>' +
                    escapeHTML(
                        title || "Professional Experience"
                    ) +
                '</h4>' +

                (
                    company
                        ? '<div class="resume-company">' +
                            escapeHTML(company) +
                          '</div>'
                        : ""
                ) +

            '</div>' +

            (
                start || end
                    ? '<div class="resume-date">' +
                        escapeHTML(
                            [start, end]
                                .filter(Boolean)
                                .join(" - ")
                        ) +
                      '</div>'
                    : ""
            ) +

        '</div>';


    if (description) {

        experienceHTML +=
            '<p class="resume-item-description">' +
                escapeHTML(description) +
            '</p>';

    }


    experienceElement.innerHTML =
        experienceHTML;


    resumeExperience.appendChild(
        experienceElement
    );

});


if (hasExperience) {

    section.classList.remove("d-none");

} else {

    section.classList.add("d-none");

}

}

/* =========================================================
CERTIFICATIONS
========================================================= */

function generateCertifications() {

const certificationItems =
    document.querySelectorAll(
        ".certification-item"
    );

const resumeCertifications =
    document.getElementById(
        "resumeCertifications"
    );

const section =
    document.getElementById(
        "resumeCertificationsSection"
    );


resumeCertifications.innerHTML = "";


let hasCertifications = false;


certificationItems.forEach(function (item) {

    const name =
        getElementValue(
            item,
            ".certification-name"
        );

    const organization =
        getElementValue(
            item,
            ".certification-organization"
        );

    const year =
        getElementValue(
            item,
            ".certification-year"
        );


    if (
        !name &&
        !organization &&
        !year
    ) {
        return;
    }


    hasCertifications = true;


    const certificationElement =
        document.createElement("div");

    certificationElement.className =
        "certification-item";


    certificationElement.innerHTML =
        '<div>' +

            '<strong>' +
                escapeHTML(
                    name || "Certification"
                ) +
            '</strong>' +

            (
                organization
                    ? '<div>' +
                        '<span>' +
                            escapeHTML(organization) +
                        '</span>' +
                      '</div>'
                    : ""
            ) +

        '</div>' +

        (
            year
                ? '<span>' +
                    escapeHTML(year) +
                  '</span>'
                : ""
        );


    resumeCertifications.appendChild(
        certificationElement
    );

});


if (hasCertifications) {

    section.classList.remove("d-none");

} else {

    section.classList.add("d-none");

}

}

/* =========================================================
ADD EDUCATION
========================================================= */

function addEducation() {

const item =
    document.createElement("div");

item.className =
    "dynamic-item education-item";


item.innerHTML =
    '<div class="d-flex justify-content-between align-items-center mb-3">' +

        '<strong class="small text-secondary">' +
            'Education' +
        '</strong>' +

        '<button ' +
            'type="button" ' +
            'class="btn btn-sm btn-outline-danger remove-item" ' +
            'title="Remove education"' +
        '>' +
            '<i class="bi bi-trash"></i>' +
        '</button>' +

    '</div>' +

    '<div class="mb-3">' +

        '<label class="form-label">' +
            'Degree / Course' +
        '</label>' +

        '<input ' +
            'type="text" ' +
            'class="form-control education-degree" ' +
            'placeholder="e.g. Bachelor of Engineering"' +
        '>' +

    '</div>' +

    '<div class="mb-3">' +

        '<label class="form-label">' +
            'Institution' +
        '</label>' +

        '<input ' +
            'type="text" ' +
            'class="form-control education-institution" ' +
            'placeholder="e.g. ABC Engineering College"' +
        '>' +

    '</div>' +

    '<div class="row">' +

        '<div class="col-md-6 mb-3">' +

            '<label class="form-label">' +
                'Year' +
            '</label>' +

            '<input ' +
                'type="text" ' +
                'class="form-control education-year" ' +
                'placeholder="2026"' +
            '>' +

        '</div>' +

        '<div class="col-md-6 mb-3">' +

            '<label class="form-label">' +
                'Grade / Percentage' +
            '</label>' +

            '<input ' +
                'type="text" ' +
                'class="form-control education-grade" ' +
                'placeholder="e.g. 8.5 CGPA"' +
            '>' +

        '</div>' +

    '</div>';


educationContainer.appendChild(item);

}

/* =========================================================
ADD PROJECT
========================================================= */

function addProject() {


const item =
    document.createElement("div");

item.className =
    "dynamic-item project-item";


item.innerHTML =
    '<div class="d-flex justify-content-between align-items-center mb-3">' +

        '<strong class="small text-secondary">' +
            'Project' +
        '</strong>' +

        '<button ' +
            'type="button" ' +
            'class="btn btn-sm btn-outline-danger remove-item" ' +
            'title="Remove project"' +
        '>' +
            '<i class="bi bi-trash"></i>' +
        '</button>' +

    '</div>' +

    '<div class="mb-3">' +

        '<label class="form-label">' +
            'Project Name' +
        '</label>' +

        '<input ' +
            'type="text" ' +
            'class="form-control project-name" ' +
            'placeholder="e.g. AI Resume Generator"' +
        '>' +

    '</div>' +

    '<div class="mb-3">' +

        '<label class="form-label">' +
            'Project Description' +
        '</label>' +

        '<textarea ' +
            'class="form-control project-description" ' +
            'rows="3" ' +
            'placeholder="Describe your project, technologies used and your contribution..."' +
        '></textarea>' +

    '</div>' +

    '<div class="mb-3">' +

        '<label class="form-label">' +
            'Technologies' +
        '</label>' +

        '<input ' +
            'type="text" ' +
            'class="form-control project-technologies" ' +
            'placeholder="e.g. HTML, CSS, JavaScript, Bootstrap"' +
        '>' +

    '</div>';


projectsContainer.appendChild(item);


}

/* =========================================================
ADD EXPERIENCE
========================================================= */

function addExperience() {


const item =
    document.createElement("div");

item.className =
    "dynamic-item experience-item";


item.innerHTML =
    '<div class="d-flex justify-content-between align-items-center mb-3">' +

        '<strong class="small text-secondary">' +
            'Experience' +
        '</strong>' +

        '<button ' +
            'type="button" ' +
            'class="btn btn-sm btn-outline-danger remove-item" ' +
            'title="Remove experience"' +
        '>' +
            '<i class="bi bi-trash"></i>' +
        '</button>' +

    '</div>' +

    '<div class="mb-3">' +

        '<label class="form-label">' +
            'Job Title' +
        '</label>' +

        '<input ' +
            'type="text" ' +
            'class="form-control experience-title" ' +
            'placeholder="e.g. WordPress Developer Intern"' +
        '>' +

    '</div>' +

    '<div class="mb-3">' +

        '<label class="form-label">' +
            'Company' +
        '</label>' +

        '<input ' +
            'type="text" ' +
            'class="form-control experience-company" ' +
            'placeholder="e.g. ABC Technologies"' +
        '>' +

    '</div>' +

    '<div class="row">' +

        '<div class="col-md-6 mb-3">' +

            '<label class="form-label">' +
                'Start Date' +
            '</label>' +

            '<input ' +
                'type="text" ' +
                'class="form-control experience-start" ' +
                'placeholder="June 2025"' +
            '>' +

        '</div>' +

        '<div class="col-md-6 mb-3">' +

            '<label class="form-label">' +
                'End Date' +
            '</label>' +

            '<input ' +
                'type="text" ' +
                'class="form-control experience-end" ' +
                'placeholder="August 2025"' +
            '>' +

        '</div>' +

    '</div>' +

    '<div class="mb-3">' +

        '<label class="form-label">' +
            'Responsibilities / Description' +
        '</label>' +

        '<textarea ' +
            'class="form-control experience-description" ' +
            'rows="3" ' +
            'placeholder="Describe your responsibilities and achievements..."' +
        '></textarea>' +

    '</div>';


experienceContainer.appendChild(item);


}

/* =========================================================
ADD CERTIFICATION
========================================================= */

function addCertification() {


const item =
    document.createElement("div");

item.className =
    "dynamic-item certification-item";


item.innerHTML =
    '<div class="d-flex justify-content-between align-items-center mb-3">' +

        '<strong class="small text-secondary">' +
            'Certification' +
        '</strong>' +

        '<button ' +
            'type="button" ' +
            'class="btn btn-sm btn-outline-danger remove-item" ' +
            'title="Remove certification"' +
        '>' +
            '<i class="bi bi-trash"></i>' +
        '</button>' +

    '</div>' +

    '<div class="mb-3">' +

        '<label class="form-label">' +
            'Certification Name' +
        '</label>' +

        '<input ' +
            'type="text" ' +
            'class="form-control certification-name" ' +
            'placeholder="e.g. Python Programming"' +
        '>' +

    '</div>' +

    '<div class="mb-3">' +

        '<label class="form-label">' +
            'Issuing Organization' +
        '</label>' +

        '<input ' +
            'type="text" ' +
            'class="form-control certification-organization" ' +
            'placeholder="e.g. Coursera"' +
        '>' +

    '</div>' +

    '<div class="mb-3">' +

        '<label class="form-label">' +
            'Year' +
        '</label>' +

        '<input ' +
            'type="text" ' +
            'class="form-control certification-year" ' +
            'placeholder="2026"' +
        '>' +

    '</div>';


certificationsContainer.appendChild(item);


}

/* =========================================================
REMOVE DYNAMIC ITEMS
========================================================= */

document.addEventListener(
"click",
function (event) {


    const removeButton =
        event.target.closest(
            ".remove-item"
        );


    if (!removeButton) {
        return;
    }


    const item =
        removeButton.closest(
            ".dynamic-item"
        );


    if (item) {

        item.remove();

    }

}


);

/* =========================================================
CLEAR FORM
========================================================= */

function clearForm() {


const shouldClear =
    confirm(
        "Are you sure you want to clear all entered information?"
    );


if (!shouldClear) {
    return;
}


resumeForm.reset();


resetDynamicContainers();


resumeDocument.classList.add("d-none");

resumeEmpty.classList.remove("d-none");

printResumeBtn.disabled = true;


hideResumeSections();


window.scrollTo({
    top: 0,
    behavior: "smooth"
});

}

/* =========================================================
RESET DYNAMIC CONTAINERS
========================================================= */

function resetDynamicContainers() {

educationContainer.innerHTML =
    getDefaultEducationHTML();


projectsContainer.innerHTML =
    getDefaultProjectHTML();


experienceContainer.innerHTML =
    getDefaultExperienceHTML();


certificationsContainer.innerHTML =
    getDefaultCertificationHTML();

}

/* =========================================================
DEFAULT EDUCATION
========================================================= */

function getDefaultEducationHTML() {

return (
    '<div class="dynamic-item education-item">' +

        '<div class="mb-3">' +

            '<label class="form-label">' +
                'Degree / Course' +
            '</label>' +

            '<input ' +
                'type="text" ' +
                'class="form-control education-degree" ' +
                'placeholder="e.g. Bachelor of Engineering"' +
            '>' +

        '</div>' +

        '<div class="mb-3">' +

            '<label class="form-label">' +
                'Institution' +
            '</label>' +

            '<input ' +
                'type="text" ' +
                'class="form-control education-institution" ' +
                'placeholder="e.g. ABC Engineering College"' +
            '>' +

        '</div>' +

        '<div class="row">' +

            '<div class="col-md-6 mb-3">' +

                '<label class="form-label">' +
                    'Year' +
                '</label>' +

                '<input ' +
                    'type="text" ' +
                    'class="form-control education-year" ' +
                    'placeholder="2026"' +
                '>' +

            '</div>' +

            '<div class="col-md-6 mb-3">' +

                '<label class="form-label">' +
                    'Grade / Percentage' +
                '</label>' +

                '<input ' +
                    'type="text" ' +
                    'class="form-control education-grade" ' +
                    'placeholder="e.g. 8.5 CGPA"' +
                '>' +

            '</div>' +

        '</div>' +

    '</div>'
);

}

/* =========================================================
DEFAULT PROJECT
========================================================= */

function getDefaultProjectHTML() {

return (
    '<div class="dynamic-item project-item">' +

        '<div class="mb-3">' +

            '<label class="form-label">' +
                'Project Name' +
            '</label>' +

            '<input ' +
                'type="text" ' +
                'class="form-control project-name" ' +
                'placeholder="e.g. AI Study Assistant"' +
            '>' +

        '</div>' +

        '<div class="mb-3">' +

            '<label class="form-label">' +
                'Project Description' +
            '</label>' +

            '<textarea ' +
                'class="form-control project-description" ' +
                'rows="3" ' +
                'placeholder="Describe your project, technologies used and your contribution..."' +
            '></textarea>' +

        '</div>' +

        '<div class="mb-3">' +

            '<label class="form-label">' +
                'Technologies' +
            '</label>' +

            '<input ' +
                'type="text" ' +
                'class="form-control project-technologies" ' +
                'placeholder="e.g. HTML, CSS, JavaScript, Bootstrap"' +
            '>' +

        '</div>' +

    '</div>'
);


}

/* =========================================================
DEFAULT EXPERIENCE
========================================================= */

function getDefaultExperienceHTML() {


return (
    '<div class="dynamic-item experience-item">' +

        '<div class="mb-3">' +

            '<label class="form-label">' +
                'Job Title' +
            '</label>' +

            '<input ' +
                'type="text" ' +
                'class="form-control experience-title" ' +
                'placeholder="e.g. WordPress Developer Intern"' +
            '>' +

        '</div>' +

        '<div class="mb-3">' +

            '<label class="form-label">' +
                'Company' +
            '</label>' +

            '<input ' +
                'type="text" ' +
                'class="form-control experience-company" ' +
                'placeholder="e.g. ABC Technologies"' +
            '>' +

        '</div>' +

        '<div class="row">' +

            '<div class="col-md-6 mb-3">' +

                '<label class="form-label">' +
                    'Start Date' +
                '</label>' +

                '<input ' +
                    'type="text" ' +
                    'class="form-control experience-start" ' +
                    'placeholder="June 2025"' +
                '>' +

            '</div>' +

            '<div class="col-md-6 mb-3">' +

                '<label class="form-label">' +
                    'End Date' +
                '</label>' +

                '<input ' +
                    'type="text" ' +
                    'class="form-control experience-end" ' +
                    'placeholder="August 2025"' +
                '>' +

            '</div>' +

        '</div>' +

        '<div class="mb-3">' +

            '<label class="form-label">' +
                'Responsibilities / Description' +
            '</label>' +

            '<textarea ' +
                'class="form-control experience-description" ' +
                'rows="3" ' +
                'placeholder="Describe your responsibilities and achievements..."' +
            '></textarea>' +

        '</div>' +

    '</div>'
);


}

/* =========================================================
DEFAULT CERTIFICATION
========================================================= */

function getDefaultCertificationHTML() {


return (
    '<div class="dynamic-item certification-item">' +

        '<div class="mb-3">' +

            '<label class="form-label">' +
                'Certification Name' +
            '</label>' +

            '<input ' +
                'type="text" ' +
                'class="form-control certification-name" ' +
                'placeholder="e.g. Python Programming"' +
            '>' +

        '</div>' +

        '<div class="mb-3">' +

            '<label class="form-label">' +
                'Issuing Organization' +
            '</label>' +

            '<input ' +
                'type="text" ' +
                'class="form-control certification-organization" ' +
                'placeholder="e.g. Coursera"' +
            '>' +

        '</div>' +

        '<div class="mb-3">' +

            '<label class="form-label">' +
                'Year' +
            '</label>' +

            '<input ' +
                'type="text" ' +
                'class="form-control certification-year" ' +
                'placeholder="2026"' +
            '>' +

        '</div>' +

    '</div>'
);


}

/* =========================================================
PRINT RESUME
========================================================= */

function printResume() {


if (
    resumeDocument.classList.contains(
        "d-none"
    )
) {

    alert(
        "Please generate your resume first."
    );

    return;

}


window.print();


}

/* =========================================================
HIDE RESUME SECTIONS
========================================================= */

function hideResumeSections() {


const sections = [
    "resumeSummarySection",
    "resumeEducationSection",
    "resumeSkillsSection",
    "resumeProjectsSection",
    "resumeExperienceSection",
    "resumeCertificationsSection"
];


sections.forEach(function (id) {

    const section =
        document.getElementById(id);

    if (section) {

        section.classList.add("d-none");

    }

});


}

/* =========================================================
GET VALUE
========================================================= */

function getValue(id) {


const element =
    document.getElementById(id);


if (!element) {
    return "";
}


return element.value.trim();


}

/* =========================================================
GET VALUE FROM ELEMENT
========================================================= */

function getElementValue(
parent,
selector
) {


const element =
    parent.querySelector(selector);


if (!element) {
    return "";
}


return element.value.trim();


}

/* =========================================================
SET TEXT
========================================================= */

function setText(
id,
value
) {


const element =
    document.getElementById(id);


if (element) {

    element.textContent = value;

}


}

/* =========================================================
UPDATE CONTACT ITEM
========================================================= */

function updateContactItem(
wrapperId,
textId,
value,
isLink = false
) {


const wrapper =
    document.getElementById(
        wrapperId
    );

const element =
    document.getElementById(
        textId
    );


if (!wrapper || !element) {
    return;
}


if (!value) {

    wrapper.classList.add("d-none");

    element.textContent = "";

    return;

}


wrapper.classList.remove("d-none");


if (isLink) {

    element.textContent =
        shortenURL(value);

} else {

    element.textContent = value;

}


}

/* =========================================================
SHORTEN URL
========================================================= */

function shortenURL(url) {


try {

    const parsedURL =
        new URL(url);


    let hostname =
        parsedURL.hostname
            .replace(/^www\./, "");


    const path =
        parsedURL.pathname
            .replace(/\/$/, "");


    if (path) {

        return hostname + path;

    }


    return hostname;

} catch (error) {

    return url
        .replace(/^https?:\/\//, "")
        .replace(/^www\./, "")
        .replace(/\/$/, "");

}

}

/* =========================================================
ESCAPE HTML
========================================================= */

function escapeHTML(value) {

const div =
    document.createElement("div");


div.textContent = value;


return div.innerHTML;

}
