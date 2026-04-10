import React from 'react'
import styles from './HomePage.module.scss'
import Header from '../../components/Header/Header.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import frame1 from '../../assets/Frame 427318990 (1).png'
import frame2 from '../../assets/Frame 427318991 (1).png'
import frame3 from '../../assets/Group (1).png'
import { useState, useEffect, useRef } from "react";
import travel from '../../assets/briefcase-02.png'
import code from '../../assets/code-browser.png'
import astronomy from '../../assets/Icon (3).png'
import physic from '../../assets/Icon.png'
import CourseCard from '../../components/CourseCard/CourseCard.jsx'
import Tdata from '../../data/top_teacher.js'
import star from '../../assets/icon-1star.png'
import CommentIcon from '../../assets/Ellipse 61.png'
import quoteImg from '../../assets/Vector.png'
import bkImg1 from '../../assets/image.png'
import bkImg2 from '../../assets/image (1).png'

const CircularProgress = ({ value = 80, label = "Completion rate of our courses", size = 180, color = "#4A90E2" }) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const animRef = useRef(null);
 
  const clampedValue = Math.min(100, Math.max(0, value));
  const strokeWidth = size * 0.075;
  const r = size / 2 - strokeWidth;
  const cx = size / 2;
  const cy = size / 2;
 
  const trackPath = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;
 
  const filledDeg = (animatedValue / 100) * 180;
  const toRad = (deg) => (deg * Math.PI) / 180;
  const tipAngleDeg = 180 - filledDeg;
  const tipX = cx + r * Math.cos(toRad(tipAngleDeg));
  const tipY = cy - r * Math.sin(toRad(tipAngleDeg));
  const largeArc = filledDeg > 180 ? 1 : 0;
  const fillPath = filledDeg > 0
    ? `M ${cx - r} ${cy} A ${r} ${r} 0 ${largeArc} 1 ${tipX} ${tipY}`
    : "";
 
  useEffect(() => {
    cancelAnimationFrame(animRef.current);
    let start = null;
    const duration = 1200;
    const to = clampedValue;
 
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedValue(to * eased);
      if (progress < 1) animRef.current = requestAnimationFrame(step);
    };
 
    setAnimatedValue(0);
    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, [clampedValue]);
 
  return (
    <div className={styles.cardCircularProgress}>
      <div
        className={styles.svgWrapperCircularProgress}
        style={{ width: size, height: size / 2 + strokeWidth }}
      >
        <svg width={size} height={size} style={{ position: "absolute", top: 0, left: 0 }}>
          {/* Track */}
          <path
            d={trackPath}
            fill="none"
            stroke="#E8EEF7"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Fill */}
          {fillPath && (
            <path
              d={fillPath}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
          )}
          {/* Dot at tip */}
          {filledDeg > 1 && (
            <circle cx={tipX} cy={tipY} r={strokeWidth * 0.4} fill={color} />
          )}
          {/* Center dot */}
          <circle cx={cx} cy={cy} r={strokeWidth * 0.25} fill={color} />
        </svg>
      </div>
 
      <div className={styles.valueTextCircularProgress}>{animatedValue.toFixed(1)}%</div>
      <div className={styles.labelCircularProgress}>{label}</div>
    </div>
  );
};

const TopInstructor = ({name,role,rating,students,thumbnail}) => {
  return(
      <div className={styles.TopInsCard}>
        <img src={thumbnail} alt="instructor" />
        <p>{name}</p>
        <p>{role}</p>
        <div className={styles.sepLineIns} />
        <div className={styles.strNNum}>
          <img src={star} alt="star" />
          <p>{rating}</p>
        </div>
        <p>{students}</p>
      </div>
    
  )
}

const TopCourses = (data) =>{
  let x = data.sort((a,b) => b.rating - a.rating)
  return x.slice(0,4)
}
const TopCat = (data) => {
  const categoryMap = {};
  data.forEach(course => {
    if (!categoryMap[course.category]) {
      categoryMap[course.category] = 0;
    }
    categoryMap[course.category] += course.reviews;
  });

  // Chuyển thành array, sort, lấy top 4
  return Object.entries(categoryMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 4)
    .map(([category, totalReviews]) => ({ category, totalReviews }));
};

const HomePage = () => {

  const [products, setProducts] = useState([]);
const [Mainreviews, setReviews] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const [coursesRes, reviewsRes] = await Promise.all([
        fetch('http://localhost:3001/courses'),
        fetch('http://localhost:3001/mainComment'),
      ]);

      if (!coursesRes.ok) throw new Error(`Lỗi courses: ${coursesRes.status}`);
      if (!reviewsRes.ok) throw new Error(`Lỗi reviews: ${reviewsRes.status}`);

      const [courses, reviewsData] = await Promise.all([
        coursesRes.json(),
        reviewsRes.json(),
      ]);

      setProducts(courses);
      setReviews(reviewsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Lỗi: {error}</p>;
  
  
  
  return (
    
    <>
    {/* <Header></Header> */}
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
          <img src={frame1} alt="deco1" />
          <img src={frame2} alt="deco2" />
          <img src={frame3} alt="deco3" />
          <CircularProgress></CircularProgress>
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
          <div className={styles.ast}>
            <div className={styles.imgBino}>
              <img src={astronomy} />
            </div>
            <p>{TopCat(products)[0].category.charAt(0).toUpperCase() + TopCat(products)[0].category.slice(1)}</p>
            <p>{TopCat(products)[0].totalReviews} Courses</p>
          </div>
          <div className={styles.dev}>
            <div className={styles.imgDev}>
              <img src={code} />
            </div>
            <p>{TopCat(products)[1].category.charAt(0).toUpperCase() + TopCat(products)[1].category.slice(1)}</p>
            <p>{TopCat(products)[1].totalReviews} Courses</p>
          </div>
          <div className={styles.market}>
            <div className={styles.marImg}>
              <img src={travel} />
            </div>
            <p>{TopCat(products)[2].category.charAt(0).toUpperCase() + TopCat(products)[2].category.slice(1)}</p>
            <p>{TopCat(products)[2].totalReviews} Courses</p>
          </div>
          <div className={styles.physic}>
            <div className={styles.phyImg}>
              <img src={physic}/>
            </div>
            <p>{TopCat(products)[3].category.charAt(0).toUpperCase() + TopCat(products)[3].category.slice(1)}</p>
            <p>{TopCat(products)[3].totalReviews} Courses</p>
          </div>
        </div>
 
        <div className={styles.topCour}>
          <p>Top Courses</p>
          <div className={styles.topCourCard}>
            {TopCourses(products).map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                instructor={course.author}
                rating={course.rating}
                ratingCount={course.reviews}
                duration={`${course.hours} Total Hours. ${course.lectures} Lectures. ${course.level}`}
                category={course.category}
                price={`$${course.price}`}
              />
            ))}
          </div>
        </div>
 
        <div className={styles.topIns}>
          <p>Top #5 Instructor</p>
          <div className={styles.topInsCardParent}>
            {Tdata.map((t) => <TopInstructor name={t.name} role={t.role} rating={t.rating} students={t.students} thumbnail={t.thumbnail}></TopInstructor>)}
          </div>
          {/* {name,role,rating,students} */}
        </div>
      </div>
 
      <div className={styles.cusRev}>
        <p>What customer say about us</p>
        <div className={styles.lowerRev}>
          {Mainreviews.map((data) => 
            <div className={styles.cusBox}>
              <img src={quoteImg} alt="quote icon" />
              <p>
                {data.content}
              </p>
              <div className={styles.iconDiv}>
                <img src={CommentIcon} alt="reviewer avatar" />
                <p>{data.name}</p>
                <p>{data.role}</p>
              </div>
            </div>
            )}
        </div>
      </div>
 
      <div className={styles.cntPage}>
        <div className={styles.ci}>
          <img src={bkImg1} alt="become instructor" />
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
          <img src={bkImg2} alt="checkout courses" />
        </div>
      </div>
    </section>
    
    </>
  );
}

export default HomePage

