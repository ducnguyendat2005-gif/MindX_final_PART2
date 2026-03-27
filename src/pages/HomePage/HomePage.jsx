import React from 'react'
import styles from './HomePage.module.scss'
import Header from '../../components/Header/Header.jsx'
import Footer from '../../components/Footer/Footer.jsx'

const HomePage = () => {
  return (
    <>
    <Header></Header>
    <section className={styles.mainPage}>
      <div className={styles.homePageBanner}>
        <div className={styles.leftInfo}>
          <p>Unlock Your Potential with Byway</p>
          <p>
            Welcome to Byway, where learning knows no bounds. We believe that
            education is the key to personal and professional growth, and we're
            here to guide you on your journey to success. Whether you're a
            student, professional, or lifelong learner, our cutting-edge
            Learning Management System is designed to elevate your learning
            experience.
          </p>
          <button>Start your instructor journey</button>
        </div>
        <div className={styles.decoRight}>
          <img src="./Frame 427318990 (1).png" alt="deco1" />
          <img src="./Frame 427318991 (1).png" alt="deco2" />
          <img src="./Group (1).png" alt="deco3" />
          <div className={styles.gaugeBox}>
            <svg viewBox="0 0 160 100">
              <path className={styles.gaugeBg} d="M 20 80 A 60 60 0 0 1 140 80" />
              <path className={styles.gaugeFill} d="M 20 80 A 60 60 0 0 1 140 80" />
              <circle className={styles.gaugeCenter} cx="80" cy="80" r="4" />
            </svg>
            <div className={styles.percentage}>87.6%</div>
            <div className={styles.label}>Completion rate of our courses</div>
          </div>
        </div>
      </div>
 
      <div className={styles.massCounter}>
        <div className={styles.insideText}>
          <div className={styles.first}>
            <p>250+</p>
            <p>Courses by our best mentors</p>
          </div>
          <span className={styles.sepLine1} />
          <div className={styles.second}>
            <p>1000+</p>
            <p>Courses by our best mentors</p>
          </div>
          <span className={styles.sepLine2} />
          <div className={styles.third}>
            <p>15+</p>
            <p>Courses by our best mentors</p>
          </div>
          <span className={styles.sepLine3} />
          <div className={styles.fourth}>
            <p>2400+</p>
            <p>Courses by our best mentors</p>
          </div>
        </div>
      </div>
 
      <div className={styles.topField}>
        <div className={styles.topCat}>
          <p>Top Catergories</p>
          <a href="#">See all</a>
          <div className={styles.ast}>
            <div className={styles.imgBino}>
              <img src="./Icon (3).png" alt="astrology icon" />
            </div>
            <p>Astrology</p>
            <p>11 Courses</p>
          </div>
          <div className={styles.dev}>
            <div className={styles.imgDev}>
              <img src="./code-browser.png" alt="development icon" />
            </div>
            <p>Development</p>
            <p>12 Courses</p>
          </div>
          <div className={styles.market}>
            <div className={styles.marImg}>
              <img src="./briefcase-02.png" alt="marketing icon" />
            </div>
            <p>Marketing</p>
            <p>12 Courses</p>
          </div>
          <div className={styles.physic}>
            <div className={styles.phyImg}>
              <img src="./Icon.png" alt="physics icon" />
            </div>
            <p>Physics</p>
            <p>12 Courses</p>
          </div>
        </div>
 
        <div className={styles.topCour}>
          <p>Top Courses</p>
          <a href="#">See all</a>
          {['c1', 'c2', 'c3', 'c4'].map((key) => (
            <div key={key} className={styles[key]}>
              <img src="./Rectangle 1080.png" alt="course thumbnail" />
              <p>Beginner's Guide to Design</p>
              <p>By Ronald Richard</p>
              <div className={styles.rtin}>
                <img src="./ratings.png" alt="rating stars" />
                <p>1200 Ratings</p>
              </div>
              <p>22 Total Hours. 155 Lectures. Beginner</p>
              <p>$149.9</p>
            </div>
          ))}
        </div>
 
        <div className={styles.topIns}>
          <p>Top Instructor</p>
          <a href="#">See all</a>
          {['ins1', 'ins2', 'ins3', 'ins4', 'ins5'].map((key) => (
            <div key={key} className={styles[key]}>
              <img src="./Rectangle 1136.png" alt="instructor" />
              <p>Ronald Richard</p>
              <p>UI/UX Designer</p>
              <div className={styles.sepLineIns} />
              <div className={styles.strNNum}>
                <img src="./icon-1star.png" alt="star" />
                <p>4.9</p>
              </div>
              <p>2400 students</p>
            </div>
          ))}
        </div>
      </div>
 
      <div className={styles.cusRev}>
        <p>What customer say about us</p>
        <div className={styles.lowerRev}>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={styles.cusBox}>
              <img src="./Vector.png" alt="quote icon" />
              <p>
                "Byway's tech courses are top-notch! As someone who's always
                looking to stay ahead in the rapidly evolving tech world, I
                appreciate the up-to-date content and engaging multimedia.
              </p>
              <div className={styles.iconDiv}>
                <img src="./Ellipse 61.png" alt="reviewer avatar" />
                <p>Jane Doe</p>
                <p>Designer</p>
              </div>
            </div>
          ))}
        </div>
      </div>
 
      <div className={styles.cntPage}>
        <div className={styles.ci}>
          <img src="./image.png" alt="become instructor" />
          <div className={styles.ciDes}>
            <p>Become an Instructor</p>
            <p>
              Instructors from around the world teach millions of students on
              Byway. We provide the tools and skills to teach what you love.
            </p>
            <button>Start Your Instructor Journey</button>
          </div>
        </div>
        <div className={styles.cc}>
          <div className={styles.ccDes}>
            <p>Transform your life through education</p>
            <p>
              Learners around the world are launching new careers, advancing in
              their fields, and enriching their lives.
            </p>
            <button>Checkout Courses</button>
          </div>
          <img src="./image (1).png" alt="checkout courses" />
        </div>
      </div>
    </section>
    <Footer></Footer>
    </>
  );
}

export default HomePage

