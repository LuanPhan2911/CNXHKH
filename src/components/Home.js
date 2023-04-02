import "./Home.scss";
import "./Questions.scss";
import data from "../assets/data.json";
import { useEffect, useState } from "react";
import {
  BsArrowRightCircleFill,
  BsArrowLeftCircleFill,
  BsMenuUp,
} from "react-icons/bs";
import {
  AiOutlineFontColors,
  AiOutlineFontSize,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineSetting,
} from "react-icons/ai";
import { IoColorPaletteOutline } from "react-icons/io5";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import {
  changeFontSize,
  changeColor,
  changeFontFamily,
  changeAskMarked,
  changeChapterId,
} from "../features/AppSlice";
const Home = ({ colors, fontFamily }) => {
  const dispatch = useDispatch();
  const [chapters, setChapters] = useState([]);
  const [questions, setQuestions] = useState([]);

  const selectedFontFamily = useSelector((state) => state.app.fontFamily);
  const fontSize = useSelector((state) => state.app.fontSize);
  const askMarked = useSelector((state) => state.app.askMarked);
  const chapterId = useSelector((state) => state.app.chapterId);
  useEffect(() => {
    let chapters = [];
    data?.length > 0 &&
      data.map((item) => {
        let obj = {};
        let { id, chapter, questions } = item;
        obj.id = id;
        obj.chapter = chapter;
        obj.questions = questions;
        obj.active = false;
        chapters.push(obj);
        return item;
      });
    let cpQuestions = [];
    let chapterIndex =
      chapters?.length > 0 &&
      chapters.findIndex((item) => item.id === chapterId);
    if (chapterIndex !== -1) {
      chapters[chapterIndex].active = true;
      cpQuestions = [...chapters[chapterIndex].questions];
    }

    cpQuestions =
      cpQuestions?.length > 0 &&
      cpQuestions.map((item) => {
        if (askMarked.indexOf(item?.id) !== -1) {
          item.marked = true;
        }
        return item;
      });
    setQuestions([...cpQuestions]);
    setChapters([...chapters]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleSetChapter = (chapterId) => {
    let chapterCopy = chapters;
    let indexChapter = -1;
    chapterCopy =
      chapterCopy?.length > 0 &&
      chapterCopy.map((item, index) => {
        if (item.id === chapterId) {
          item.active = true;
          indexChapter = index;
        } else {
          item.active = false;
        }
        return item;
      });
    let questionsCopy = [];
    if (indexChapter !== -1) {
      questionsCopy = [...chapterCopy[indexChapter].questions];
      dispatch(changeChapterId(chapterId));
    }

    questionsCopy?.length > 0 &&
      questionsCopy.forEach((item) => {
        item.isShow = false;
        item.marked = false;
      });

    questionsCopy =
      questionsCopy?.length > 0 &&
      questionsCopy.map((item) => {
        if (askMarked.indexOf(item?.id) !== -1) {
          item.marked = true;
        }
        return item;
      });
    setQuestions([...questionsCopy]);
    setChapters([...chapterCopy]);
  };
  const handleShowHideAnswer = (questionId, questionIndex) => {
    let questionsCopy = questions;
    if ((questionsCopy[questionIndex].id = questionId)) {
      let isShow = questionsCopy[questionIndex].isShow;
      questionsCopy[questionIndex].isShow = !isShow;
      setQuestions([...questionsCopy]);
      return;
    }
    questionsCopy?.length > 0 &&
      questionsCopy.forEach((item) => {
        if (item.id === questionId) {
          item.isShow = !item.isShow;
        }
      });
    setQuestions([...questionsCopy]);
  };
  const handleChangeFontSize = (id) => {
    let copyFontSize = fontSize;
    if (fontSize <= 12) {
      if (id === "plus") {
        copyFontSize++;
      }
      dispatch(changeFontSize(copyFontSize));
      return;
    }
    if (fontSize >= 30) {
      if (id === "minus") {
        copyFontSize--;
      }
      dispatch(changeFontSize(copyFontSize));
      return;
    }
    if (id === "plus") {
      copyFontSize++;
    }
    if (id === "minus") {
      copyFontSize--;
    }
    dispatch(changeFontSize(copyFontSize));
  };
  const handleChangeColor = (item) => {
    let { color, backgroundColor } = item;
    // setSelectedColor(obj);
    dispatch(
      changeColor({
        color,
        backgroundColor,
      })
    );
  };
  const handleChangeFontFamily = (e) => {
    let fontFamily = e.target.value;
    dispatch(changeFontFamily(fontFamily));
  };
  const handleMarkAsk = (questionId) => {
    let cpQuestions = questions;
    let index =
      cpQuestions?.length > 0 &&
      cpQuestions.findIndex((item) => item.id === questionId);
    if (index !== -1) {
      if (cpQuestions[index].marked === true) {
        cpQuestions[index].marked = false;
      } else {
        cpQuestions[index].marked = true;
      }
      dispatch(changeAskMarked(questionId));
    }

    setQuestions([...cpQuestions]);
  };
  const Setting = (
    <Popover id="popover">
      <Popover.Header as="h3">Tùy chỉnh</Popover.Header>
      <Popover.Body>
        <div className="control">
          <div className="change-color card card-body">
            <div className="background">
              <IoColorPaletteOutline className="icon" />
              Màu nền
            </div>
            <div className="colors">
              {colors?.length > 0 &&
                colors.map((item, index) => {
                  return (
                    <button
                      key={index}
                      className="color-item"
                      style={{
                        backgroundColor: item.backgroundColor,
                      }}
                      onClick={() => handleChangeColor(item)}
                    ></button>
                  );
                })}
            </div>
          </div>
          <div className="change-font-family card card-body">
            <div className="font-family-title">
              <AiOutlineFontColors className="icon" />
              Phong chữ
            </div>
            <div className="font-family">
              <select
                className="form-control"
                onChange={(e) => handleChangeFontFamily(e)}
              >
                {fontFamily?.length > 0 &&
                  fontFamily.map((item, index) => {
                    return (
                      <option value={item} key={index}>
                        {item}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          <div className="change-font-size card card-body">
            <div className="font-size-title">
              <AiOutlineFontSize className="icon" />
              Cở chữ
            </div>
            <div className="font-size">
              <AiOutlineMinus
                className="icon"
                onClick={() => handleChangeFontSize("minus")}
              />
              {fontSize}
              <AiOutlinePlus
                className="icon"
                onClick={() => handleChangeFontSize("plus")}
              />
            </div>
          </div>
        </div>
      </Popover.Body>
    </Popover>
  );
  const Menu = (
    <Popover id="popover">
      <Popover.Header as="h3">Danh sách chương</Popover.Header>
      <Popover.Body>
        <ul className="list-group">
          {chapters?.length > 0 &&
            chapters.map((item) => {
              return (
                <li
                  className={
                    item.active ? "list-group-item active" : "list-group-item"
                  }
                  style={{
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                  key={item.id}
                  onClick={() => handleSetChapter(item.id)}
                >
                  {item.chapter}
                </li>
              );
            })}
        </ul>
      </Popover.Body>
    </Popover>
  );
  return (
    <div className="container">
      <div className="header">
        <OverlayTrigger trigger={["click"]} placement="right" overlay={Menu}>
          <button className="menu">
            <BsMenuUp className="icon" />
          </button>
        </OverlayTrigger>
        <div className="navbar">
          <div className="title">Chủ nghĩa xã hội khoa học</div>
        </div>

        <OverlayTrigger trigger={["click"]} placement="left" overlay={Setting}>
          <button className="setting">
            <AiOutlineSetting className="icon" />
          </button>
        </OverlayTrigger>
      </div>
      <div className="main">
        <div
          className="content"
          style={{
            fontSize: fontSize,
            fontFamily: selectedFontFamily,
            userSelect: "none",
          }}
        >
          <div
            className="card card-body"
            style={{
              color: "inherit",
              backgroundColor: "inherit",
            }}
          >
            {questions?.length > 0 &&
              questions.map((item, index) => {
                return (
                  <div className="questions" key={item.id}>
                    <div
                      className={item.marked ? "ask marked" : "ask"}
                      onClick={() => handleMarkAsk(item.id)}
                    >
                      {item.ask}
                    </div>
                    <div className="ans">
                      {item.isShow ? (
                        <span
                          onClick={() => handleShowHideAnswer(item.id, index)}
                        >
                          {item.ans}
                          <BsArrowLeftCircleFill className="hide-ans" />
                        </span>
                      ) : (
                        <span
                          onClick={() => handleShowHideAnswer(item.id, index)}
                        >
                          <BsArrowRightCircleFill className="show-ans" />
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
