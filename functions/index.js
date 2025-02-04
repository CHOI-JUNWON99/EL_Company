const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require("cors")({
  origin: ["https://www.elgiup.co.kr"],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
});

admin.initializeApp();

require("dotenv").config();

const naverEmail = process.env.NAVER_EMAIL;
const naverPassword = process.env.NAVER_PASSWORD;

const mailTransport = nodemailer.createTransport({
  host: "smtp.naver.com",
  port: 465,
  secure: true,
  auth: {
    user: naverEmail,
    pass: naverPassword,
  },
});

exports.sendEmail = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method === "OPTIONS") {
      res.set("Access-Control-Allow-Origin", "https://www.elgiup.co.kr");
      res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
      res.set("Access-Control-Allow-Headers", "Content-Type");
      return res.status(204).send("");
    }

    const { subject, name, phone, email, message, fileUrl } = req.body;

    if (!subject || !name || !phone || !email || !message) {
      res.set("Access-Control-Allow-Origin", "https://www.elgiup.co.kr");
      return res.status(400).send("모든 필드를 입력해주세요.");
    }

    // 파일이 있는 경우 첨부파일 데이터 생성
    const attachments = fileUrl
      ? [
          {
            filename: "첨부파일", // 파일 이름 지정
            path: fileUrl, // Firebase Storage에서 가져온 파일 URL
          },
        ]
      : [];

    const mailOptions = {
      from: naverEmail,
      to: "ygd804@naver.com",
      subject: `견적 요청: ${subject}`,
      text: `이름: ${name}\n휴대폰 번호: ${phone}\n이메일: ${email}\n\n내용:\n${message}`,
      attachments, // 첨부파일 추가
    };

    try {
      await mailTransport.sendMail(mailOptions);
      res.set("Access-Control-Allow-Origin", "https://www.elgiup.co.kr");
      return res.status(200).send("이메일이 성공적으로 전송되었습니다.");
    } catch (error) {
      console.error("Error sending email:", error);
      res.set("Access-Control-Allow-Origin", "https://www.elgiup.co.kr");
      return res.status(500).send("이메일 전송에 실패했습니다.");
    }
  });
});
