import React from "react";
import "../../../Styles/Footer.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import QrCode2OutlinedIcon from "@mui/icons-material/QrCode2Outlined";
import { FaGooglePlay, FaApple } from "react-icons/fa";
const CarouselForm = () => {
  return (
    <formfooter>
      <formt>
        <formtt>
          <formt1>
            <h6 className="mb-3 mt-3">Trung tâm hỗ trợ</h6>
            <div>Trung Tâm Trợ Giúp</div>
            <div>Chính Sách Bảo Hành</div>
            <div>Trả Hàng và Hoàn Tiền</div>
            <div>Vận Chuyển</div>
            <div>Thanh Toán</div>
          </formt1>
          <formt2>
            <h6 className="mb-3 mt-3">Về Toyskid</h6>
            <div>Giới Thiệu Về Shopee Việt Nam</div>
            <div>Tuyển Dụng</div>
            <div>Điều Khoản Shopee</div>
            <div>Chính Sách Bảo Mật</div>
            <div>Chính Hãng</div>
            <div>Kênh Người Bán</div>
            <div>Chương Trình Tiếp Thị Liên Kết</div>
            <div>Flash Sales</div>
          </formt2>
          <formt3>
            <h6 className="mb-3 mt-3">Theo dõi</h6>
            <div>
              <FacebookIcon />
              Facebook
            </div>
            <div>
              <TwitterIcon />
              Twitter
            </div>
            <div>
              <InstagramIcon />
              Instagram
            </div>
          </formt3>
          <formt4>
            <h6 className="mb-3 mt-3">TẢI ỨNG DỤNG TOYSKID NGAY THÔI</h6>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div1>
                <QrCode2OutlinedIcon sx={{ fontSize: "125px" }} />
              </div1>
              <div1>
                <FaApple size="30px" />
                <FaGooglePlay
                  size="24px"
                  style={{ marginLeft: "4px", marginTop: "10px" }}
                />
              </div1>
              <div1>
                <div>App Store</div>
                <div style={{ marginTop: "10px" }}>Google Play</div>
              </div1>
            </div>
          </formt4>
        </formtt>
      </formt>
      <formm>
        <formm1>
          <formm11>© 2022 Toyskid. Tất cả các quyền được bảo lưu.</formm11>
          <formm12>
            <div>Quốc gia và Khu vực:</div>
            <div>&nbsp;&nbsp;&nbsp;</div>
            <div>Việt Nam</div>
            <div>&nbsp;&nbsp;|&nbsp;&nbsp;</div>
            <div>Singapore</div>
            <div>&nbsp;&nbsp;|&nbsp;&nbsp;</div>
            <div>Indonesia</div>
            <div>&nbsp;&nbsp;|&nbsp;&nbsp;</div>
            <div>Thái Lan</div>
            <div>&nbsp;&nbsp;|&nbsp;&nbsp;</div>
            <div>Đài Loan</div>
            <div>&nbsp;&nbsp;|&nbsp;&nbsp;</div>
            <div>Malaysia</div>
            <div>&nbsp;&nbsp;|&nbsp;&nbsp;</div>
            <div>Philippines</div>
            <div>&nbsp;&nbsp;|&nbsp;&nbsp;</div>
            <div>Brazil</div>
            <div>&nbsp;&nbsp;|&nbsp;&nbsp;</div>
            <div>México</div>
            <div>&nbsp;&nbsp;|&nbsp;&nbsp;</div>
            <div>Colombia</div>
            <div>&nbsp;&nbsp;|&nbsp;&nbsp;</div>
            <div>Chile</div>
            <div>&nbsp;&nbsp;|&nbsp;&nbsp;</div>
            <div>France</div>
            <div>&nbsp;&nbsp;|&nbsp;&nbsp;</div>
            <div>Argentina</div>
          </formm12>
        </formm1>
      </formm>
      <formb>
        <formb1>
          <div>Công ty TNHH Toyskid</div>
          <div>
            Địa chỉ: 12 Nguyễn Văn Bảo, Phường 4, Gò Vấp, Thành phố Hồ Chí Minh,
            Việt Nam. Tổng đài hỗ trợ: 0387519060 - Email: Toyskid@gmail.com
          </div>
          <div>
            Chịu Trách Nhiệm Quản Lý Nội Dung: Hồ Dương Vũ - Điện thoại liên hệ:
            0387519060, Nguyễn Trần Nhật Hưng - Điện thoại liên hệ: 0936064271
          </div>
          <div>© 2022 - Bản quyền thuộc về Công ty TNHH Toyskid</div>
        </formb1>
      </formb>
    </formfooter>
  );
};

export default CarouselForm;
