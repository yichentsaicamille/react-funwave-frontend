import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Accordion, Figure } from 'react-bootstrap';
import axios from 'axios';

// 導引資料、頁面
import './ProductDetails.scss';
import { API_URL, IMAGE_URL } from '../../utils/config';
import longboard1 from './longboard1.jpg'; // 待釐清圖放src還是放在public
import greenTitle from '../../data/images/greenTitle.svg';

// react-icons
import { FaThumbsUp } from 'react-icons/fa';
import { IoColorPalette } from 'react-icons/io5';
import { MdOutlineSurfing } from 'react-icons/md';
import {
  AiFillStar,
  AiOutlineStar,
  AiOutlineDown,
  AiOutlineUp,
  AiFillLeftCircle,
  AiFillRightCircle,
  AiFillTags,
  AiOutlinePlus,
  AiOutlineMinus,
} from 'react-icons/ai';
// import { BsStarHalf } from 'react-icons/bs'; // 半星星

function ProductDetails(props) {
  const [product, setProduct] = useState({
    product_id: '',
    product_no: '',
    product_group: '',
    name: '',
    product_detail: '',
    big_cat_id: '',
    small_cat_id: '',
    image1: '',
    image2: '',
    image3: '',
    image4: '',
    image5: '',
    brand_id: '',
    color: '',
    size: '',
    material_id: '',
    fin_compatibility_id: '',
    price: '',
    stock: 0,
    create_time: '',
    product_valid: '',
  });

  // 產品 "小分類、品牌、材質、衝浪板舵" 的id對照名稱
  const smallCatTypes = [
    '衝浪長板',
    '衝浪快樂板',
    '衝浪短板',
    '衝浪板舵',
    '衝浪腳繩',
    '衝浪腳踏墊',
    '衝浪板袋',
    '衝浪斗篷毛巾衣',
    '防寒衣',
  ];
  const brandTypes = ['Catch Surf', 'Solid Surf Co', 'JJF by Pyzel'];
  const materialTypes = ['Polyethylene', 'EPOXY', 'EPS', '碳纖維'];
  const finCompatibilityTypes = ['FCS II Longboard', 'FCS II', 'Single Tab'];

  const [loading, setLoading] = useState(false);

  // 為了處理網址
  let navigate = useNavigate();

  // 初始化資料-模擬componentDidMount
  useEffect(() => {
    setLoading(true);

    let getProduct = async () => {
      // 欲取得後端 http://localhost:3002/api/products 資料
      let response = await axios.get(`${API_URL}/products/LB-0001`);
      console.log(response);
      console.log(response.data);
      setProduct(response.data);

      // 設定網址參數
      const searchParams = new URLSearchParams(
        `?product_no=${response.data.product_no}`
      );
      // 從網址取得
      const product_no = searchParams.get('product_group')
        ? searchParams.get('product_group')
        : '';
      const foundProduct = response.find((v, i) => v.product_no === product_no);

      // 找到符合id的商品，更新Products狀態
      if (foundProduct) {
        setProduct(foundProduct);
      }
      // navigate(`/product-details?product_no=${response.id}`);
    };
    getProduct();

    setTimeout(() => setLoading(false), 0);
  }, []);

  const spinner = (
    <div className="spinner-grow text-primary" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );

  // console.log('product狀態', Object.keys(product));
  const displayDetails = (
    <>
      {/* 中間商品細節區 */}
      {/* 大小商品圖 */}
    </>
  );

  const displaySizeDetailsSB = <>{/* 短板尺寸對照表 */}</>;

  const displayCart = (
    <>
      {/* 右邊加入購物車區 */}
      <h1>{product[0].name}</h1>
    </>
  );
  return (
    <>
      <div className="container">
        <h3>Breadcrumb</h3>
        <div className="row">
          <aside className="col-2 asideProducts">
            <div className="sticky">
              {/* 大分類 */}
              <Accordion className="mt-4" flush>
                <Accordion.Item eventKey="0">
                  <Accordion.Header className="accordionTitle">
                    <h3>衝浪板</h3>
                  </Accordion.Header>
                  <Accordion.Body>
                    <ul className="ulProducts">
                      <li className="liProducts">
                        <Link to="/" title="長板" className="linkProducts">
                          長板
                        </Link>
                      </li>
                      <li className="liProducts">
                        <Link to="/" title="快樂板" className="linkProducts">
                          快樂板
                        </Link>
                      </li>
                      <li className="liProducts">
                        <Link to="/" title="短板" className="linkProducts">
                          短板
                        </Link>
                      </li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    <h3>衝浪板配件</h3>
                  </Accordion.Header>
                  <Accordion.Body>
                    <ul className="ulProducts">
                      <li className="liProducts">
                        <Link to="/" title="衝浪板舵" className="linkProducts">
                          衝浪板舵
                        </Link>
                      </li>
                      <li className="liProducts">
                        <Link to="/" title="腳繩" className="linkProducts">
                          腳繩
                        </Link>
                      </li>
                      <li className="liProducts">
                        <Link to="/" title="腳踏墊" className="linkProducts">
                          腳踏墊
                        </Link>
                      </li>
                      <li className="liProducts">
                        <Link to="/" title="衝浪板袋" className="linkProducts">
                          衝浪板袋
                        </Link>
                      </li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    <h3>衝浪相關衣物</h3>
                  </Accordion.Header>
                  <Accordion.Body>
                    <ul className="ulProducts">
                      <li className="liProducts">
                        <Link to="/" title="防寒衣物" className="linkProducts">
                          衝浪斗篷毛巾衣
                        </Link>
                      </li>
                      <li className="liProducts">
                        <Link to="/" title="防寒衣" className="linkProducts">
                          防寒衣
                        </Link>
                      </li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

              {/* 篩選 */}
              {/* 品牌篩選 */}
              <div className="mt-5">
                <h3 className="d-flex align-items-center filterProducts pb-2 ps-3">
                  <FaThumbsUp size={20} color="#17a8a2" className="me-3" />
                  品牌
                </h3>
                <div className="form-check ms-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="brand1"
                    name="brand1"
                    value="brand1"
                  />
                  <label className="form-check-label ms-3" htmlFor="brand1">
                    A
                  </label>
                </div>
                <div className="form-check ms-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="brand2"
                    name="brand2"
                    value="brand2"
                  />
                  <label className="form-check-label ms-3" htmlFor="brand2">
                    B
                  </label>
                </div>
                <div className="form-check ms-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="brand3"
                    name="brand3"
                    value="brand3"
                  />
                  <label className="form-check-label ms-3" htmlFor="brand3">
                    C
                  </label>
                </div>
              </div>
              {/* 顏色篩選 */}
              <div className="mt-5">
                <h3 className="d-flex align-items-center filterProducts pb-2 ps-3">
                  <IoColorPalette size={22} color="#17a8a2" className="me-3" />
                  顏色
                </h3>
                <div className="form-check ms-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="color1"
                    name="color1"
                    value="color1"
                  />
                  <label className="form-check-label ms-3" htmlFor="color1">
                    紅色
                  </label>
                </div>
                <div className="form-check ms-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="color2"
                    name="color2"
                    value="color2"
                  />
                  <label className="form-check-label ms-3" htmlFor="color2">
                    橙色
                  </label>
                </div>
                <div className="form-check ms-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="color3"
                    name="color3"
                    value="color3"
                  />
                  <label className="form-check-label ms-3" htmlFor="color3">
                    黃色
                  </label>
                </div>
                <div className="form-check ms-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="color4"
                    name="color4"
                    value="color4"
                  />
                  <label className="form-check-label ms-3" htmlFor="color4">
                    綠色
                  </label>
                </div>
                <div className="form-check ms-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="color5"
                    name="color5"
                    value="color5"
                  />
                  <label className="form-check-label ms-3" htmlFor="color5">
                    藍色
                  </label>
                </div>
                <div className="form-check ms-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="color6"
                    name="color6"
                    value="color6"
                  />
                  <label className="form-check-label ms-3" htmlFor="color6">
                    紫色
                  </label>
                </div>
              </div>
              {/* 適用衝浪舵篩選 */}
              <div className="mt-5">
                <h3 className="d-flex align-items-center filterProducts pb-2 ps-3">
                  <MdOutlineSurfing
                    size={24}
                    color="#17a8a2"
                    className="me-3"
                  />
                  適用衝浪舵類型
                </h3>
                <div className="form-check ms-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="fin1"
                    name="fin1"
                    value="fin1"
                  />
                  <label className="form-check-label ms-3" htmlFor="fin1">
                    Single Tab
                  </label>
                </div>
                <div className="form-check ms-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="fin2"
                    name="fin2"
                    value="fin2"
                  />
                  <label className="form-check-label ms-3" htmlFor="fin2">
                    FCS II
                  </label>
                </div>
                <div className="form-check ms-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="fin3"
                    name="fin3"
                    value="fin3"
                  />
                  <label className="form-check-label ms-3" htmlFor="fin3">
                    FCS II Longboard
                  </label>
                </div>
                <div className="form-check ms-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="fin4"
                    name="fin4"
                    value="fin4"
                  />
                  <label className="form-check-label ms-3" htmlFor="fin4">
                    Longboard
                  </label>
                </div>
              </div>
            </div>
          </aside>
          {/* 中間商品細節區、右邊加入購物車區 */}
          <article className="col-10">
            <div className="row">
              <div className="col-9">
                {/* 中間商品細節區 */}
                {loading ? spinner : displayDetails}
              </div>
              <div className="col-3 p-0">
                {/* 右邊加入購物車區 */}
                {loading ? spinner : displayCart}
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
