import "./About.css";
import authorImage from "../../assets/Images/authorImage.jpeg";

function About() {
  return (
    <section className="about">
      <div className="about__author-image-container">
        <img
          src={authorImage}
          alt="Author portrait"
          className="about__author-image"
        />
      </div>
      <div className="about__text-container">
        <h2 className="about__title">About the Author</h2>
        <p className="about__paragraph">
          My name is Sopuru Oti. I am a full stack software engineer with
          experience and skills in HTML, CSS3, Javascript, Git, GitHub, Chrome
          DevTools, Bash, BEM, Prettier, React, Node.js, Express.js, MongoDB and
          Figma.
        </p>
        <p className="about__paragraph">
          I learned these skills along with many other soft skills from
          TripleTen's Softwware Engineer bootcamp. I look foward to learning
          more and finding a career inside the tech industry!
        </p>
      </div>
    </section>
  );
}

export default About;
