const mongoose  = require('mongoose'),
      Products  = require('./models/product'),
      Cart      = require('./models/cart'),
      User      = require('./models/user'),
      Review    = require('./models/review'),
      Item      = require('./models/item'),
      Order     = require('./models/order');

const data = [

      {
          name: "Ted Baker Telvi retro runner trainer in pale blue",
          price: "1250",
          image: "/upload/product-1.png",
          categories : "Shoes",
          qty : "1",
          details: "Showcasing its signature style through key separates and statement party dresses, Ted Baker is renowned for bringing a contemporary edge to classic styles. Combining a vibrant colour palette with off-beat prints, applique embellishment and playful detailing, the brand features clothing, footwear, swimwear and accessories across its collections, with some lines exclusive to ASOS. " 
      },

      {
          name: "Reebok Classics CL Legacy trainers in navy",
          price: "1500",
          image: "/upload/product-2.png",
          categories : "Shoes",
          qty : "1",
          details: "Since 1895, Reebok's ancestor company have been developing their line of running shoes and trainers. With the brand launched in its own right in 1958, Reebok have aligned themselves with some of the world's top athletes, continually building upon their own heritage and authenticity through high performance credentials and innovative technology. " 
      },

      {
          name: "New Balance 237 trainers in off white and beige",
          price: "1200",
          image: "/upload/product-3.png",
          categories : "Shoes",
          qty : "1",
          details: "Godfather of the dad-trainer aesthetic, New Balance has been flexing its footwear and clothing credentials for over 100 years. The brand’s supportive running trainers are all the motivation you need, while its retro lifestyle shoes are your go-tos for added style props. Scroll everything from T-shirts, leggings and accessories in our New Balance at ASOS edit, plus training tops and sports bras in a range of slick colourways. " 
      },

      {
          name: "Obey eyes logo hoodie in off white",
          price: "850",
          image: "/upload/product-4.png",
          categories : "Clothing",
          qty : "1",
          details: "First thought up in the shadow of Europe’s highest peak, the Monte Bianco, outdoors-loving brand Napapijri has been combining innovative materials with close attention to style since 1987. Take cover when the temperature drops in its technical ski jackets and trousers. " 
      },

      {
          name: "Obey icon eyes hoodie in black",
          price: "750", 
          image: "/upload/product-5.png",
          categories : "Clothing",
          qty : "1",
          details: "Founded in 2001, US streetwear label Obey is an extension of graffiti artist Shepard Fairey’s street and fine art campaign. Moving his populist views from the canvas to clothing, Fairey draws on workwear and military design influences across a selection of sweatshirts, print T-shirts and hoodies. " 
      },

      {
          name: "Calvin Klein ASOS Exclusive reverse chest logo hoodie in grey", 
          price: "650", 
          image: "/upload/product-6.png",
          categories : "Clothing",
          qty : "1",
          details: "Nobody does casual-cool like Calvin Klein. The designer brand’s minimal aesthetic and iconic CK logo are an easy way to level up any look. Scroll our Calvin Klein at ASOS edit for casual dresses, T-shirts, jeans and jackets, as well as fresh loungewear options to keep your off-duty aesthetic on point. Back to basics? Check out our pick of its cult-status bras, briefs and lingerie sets, plus swimwear and accessories for all-year-round style points. " 
      },

      {
        name: "AJ Morgan womens oversized square sunglasses in gold", 
        price: "350", 
        image: "/upload/product-7.png",
        categories : "sunglasses",
        qty : "1",
        details: "Creating a snappy range of fashion eyewear and sunglasses, American label AJ Morgan Eyewear has seen its lenses appear in cult films and television series such as, Demolition Man, Beverly Hills 90210, and Ugly Betty. Look to a distinctive collection, as oversized circle lens sunglasses sit alongside colourful print aviators and geek chic clear lens glasses in pastel shades. " 
      },

      {
        name: "New Look round sunglasses in tortoise shell", 
        price: "320", 
        image: "/upload/product-8.png",
        categories : "sunglasses",
        qty : "1",
        details: "Since setting up shop in the 60s, New Look has become a high-street classic known for creating universally loved, wardrobe-ready collections. Shop the New Look at ASOS edit, featuring everything from chic LBDs and printed dresses to all-important accessories and figure-flattering jeans (if you’re anything like us, you’re always on the hunt for those). While you’re there, check out the label’s cute-yet-classy tops and blouses for your next ‘jeans and a nice top’ day. " 
      },

      {
        name: "Ray-Ban round sunglasses in black ", 
        price: "300", 
        image: "/upload/product-9.png",
        categories : "sunglasses",
        qty : "1",
        details: "First produced for the U.S. Air Force, Ray-Ban has been making iconic sunglasses since 1937. With a rich pop culture history, Ray-Ban has gained global recognition, a cult fan-base and A-list credentials. Opt for classic frames in Aviator, Wayfarer or Clubmaster styles. " 
      },

      {
        name: "Nike bucket hat with logo in white", 
        price: "380", 
        image: "/upload/product-10.png",
        categories : "Hat&Cap",
        qty : "1",
        details: "Key players in everything activewear-related, it doesn’t get more iconic than Nike. Sporting some of the most wanted trainers in the game, browse Air Max 90s and Air Force 1s, as well as Blazer and Waffle One styles. Get off-duty looks down with tracksuits, T-shirts and accessories in our Nike at ASOS edit, or scroll performance leggings and sports bras from Nike Training and Nike Running for an extra dose of motivation. " 
      },

      {
        name: "Jack & Jones logo cap in black", 
        price: "350", 
        image: "/upload/product-11.png",
        categories : "Hat&Cap",
        qty : "1",
        details: "Founded in the 90s as a jeanswear brand, Danish label Jack & Jones has since gone on to expand its sartorial offering to include everything from jumpers, jackets and T-shirts to shoes, underwear and accessories (alongside more of its flex-worthy denim, of course). Scroll the Jack & Jones at ASOS edit to check out our latest drop of the brand’s laid-back pieces. " 
      },

      {
        name: "Jordan baseball cap in white with jumpman logo", 
        price: "420", 
        image: "/upload/product-12.png",
        categories : "Hat&Cap",
        qty : "1",
        details: "Inspired by the legend and the court, Nike Jordan pushes the boundaries of sportswear and lifestyle apparel with its iconic trainers, clothing and accessories. After the release of the original Air Jordan trainers in 1984, the brand has gone from strength to strength, both on and off the court. Shop our Jordan at ASOS edit to find some of the freshest kicks and streetwear pieces, all emblazoned with the brand’s signature Jumpman logo. " 
      },

      {
        name: "Valentino Bags Kylo large logo backpack in black", 
        price: "1950", 
        image: "/upload/product-13.png",
        categories : "Bags",
        qty : "1",
        details: "Carryall line-up in need of an upgrade? Make VALENTINO BAGS your new flex. Pairing luxury aesthetic with traditional techniques and cutting-edge design, its latest drop of bags is doing the most. Think everything from backpacks and bum bags in the brand’s signature finishes to small leather accessories like belts and wallets. Scroll the VALENTINO BAGS at ASOS edit for our favourite picks. " 
      },

      {
        name: "Tommy Hilfiger downtown flag backpack in black", 
        price: "2150", 
        image: "/upload/product-14.png",
        categories : "Bags",
        qty : "1",
        details: "Whether it’s an embroidered logo, a bold graphic print or its iconic red, white and blue colour-blocking, there’s no mistaking Tommy Hilfiger. Flying the flag for all things retro 90s, scroll our Tommy Hilfiger at ASOS edit, featuring wardrobe-ready casualwear – think T-shirts, sweatshirts and joggers, as well as smart shirts, accessories, underwear and swimwear. Shop Tommy Jeans for classic denim pieces, or filter by Tommy Sport for workout gear that’ll get you motivated. " 
      },

      {
        name: "Versace Jeans Couture new city rock pouch in black", 
        price: "1750", 
        image: "/upload/product-15.png",
        categories : "Bags",
        qty : "1",
        details: "Part high fashion, part street style, Versace Jeans Couture sits between the two. Founded by Donatella and Gianni Versace, the brand’s range of clothing and accessories takes classic denim and brings it bang up to date. Shop the Versace Jeans Couture at ASOS edit for everything from jeans, logo T-shirts and hoodies to bags and trainers, with gold-tone stitching, new-season denim and over-indulgent prints featuring heavily. " 
      }
  ];

function seedDB(){
        Products.remove({}, function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("Data removal complete!");
            data.forEach(function(seed){
                Products.create(seed, function(err, product){
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log('New data added!');
            //             Review.create({
            //                 author: 'Palm Kumpanat',
            //                 text: 'That Awesome!'

            //             }, function(err, review){
            //                 if(err){
            //                     console.log(err);
            //                 }
            //                 else{
            //                     product.reviews.push(review);
            //                     product.save();
            //                 }
            //             });
                    }
                });
            });
         }
    })
}

module.exports = seedDB;