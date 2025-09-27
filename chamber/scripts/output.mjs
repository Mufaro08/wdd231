import { setTitle, renderSections } from "./output";export function setTitle(course) {
    setSectionSelection(byuiCourse.sections);


}

export function renderSections(sections) {
    renderSections(byuiCourse.sections);
}

document.querySelector("#enrollStudent").addEventListener("click", function () {
  const sectionNum = Number(document.querySelector("#sectionNumber").value);
  byuiCourse.changeEnrollment(sectionNum);
});
document.querySelector("#dropStudent").addEventListener("click", function () {
  const sectionNum = Number(document.querySelector("#sectionNumber").value);
  byuiCourse.changeEnrollment(sectionNum, false);
});
