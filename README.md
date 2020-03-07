# Slack Clone Client

What the app looks like:

The home page:

![Prototype](./src/images/home.png)

The chatroom:

![Prototype](./src/images/chat-room.png)

Ok, mình sẽ đi vào tìm hiểu những gì mình sử dụng để xây dựng app này nhé.

### Notes:

Bạn có thể bỏ qua những dòng dưới và phi thẳng xuống phần Cài đặt cũng được nhé 😄

## Đôi lời giới thiệu

Mục đích mình xây dựng ứng dụng này chính là để ôn lại kiến thức về Node.js và React.js. Do tự học lập trình nên tiến độ làm web có thể chậm hơn rất nhiều so với các bạn khác, vì mình phải tự học và tự mày mò. Vì vậy mình chia sẻ project này mục đích giúp các bạn tự học sau này có nguồn tham khảo phong phú hơn, giảm việc học lan man mỗi chỗ một ít.

## App này mình học được gì?

- Node.js (cơ bản đến intermidiate): mình sử dụng Node.js cùng với framework nổi tiếng của nó là Express.js để viết backend, bao gồm các API, logic để xác thực người dùng, kết nối tới database...

- PostgreSQL: nhiều bạn có thể thắc mắc tại sao không phải là MongoDB? Mình cũng có xây dựng một app e-commerce sử dụng MongoDB rồi nên app này mình quyết định quay về cơ sở dữ liệu quan hệ. Bản thân mình hứng thú với CSDL quan hệ hơn và trên thực tế mình thấy nhiều hệ thống lớn cũng vẫn sử dụng CSDL quan hệ.

- React.js: Mình sử dụng cả code lifecycle và hook trong project này. Ưu điểm của hook là mình thấy code dễ đọc hơn một tý và dùng được cho functional component. Sử dụng React Router để viết các routes.

- JavaScript: mình được ôn lại kỹ thuật xử lý bất đồng bộ, hiểu được thằng async/await được phát triển dựa trên Promise và Generation của ES6.

- Thiết kế database (mức độ cơ bản);

- Xử lý realtime: Có thể nói phần này mình tốn khá nhiều thời gian để tìm hiểu.

- Stream video với công nghệ WebRTC

- Xử lý giao diện bằng CSS: Mình có dùng một thư viện CSS cho project tên là Semantic UI React (dạng components), tuy nhiên nhiều chỗ trong project mình vẫn phải tự viết CSS "chay" như thiết kế layout dạng grid cho phần chat room, trang chủ, etc.

- Clean Code

## Hướng dẫn cài đặt project

Nếu bạn có hứng thú với project và muốn tải về xem thử trong máy thì hãy đảm bảo các bước sau cần được thực hiện trước khi `yarn start` nhé 😀
