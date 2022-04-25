const mongoose  = require('mongoose'),
      Products  = require('./models/product'),
      Cart      = require('./models/cart'),
      User      = require('./models/user'),
      Review    = require('./models/review');

// const data = [

//       {
//           name: "Ted Baker Telvi retro runner trainer in pale blue",
//           price: "1250",
//           url: "https://images.asos-media.com/products/ted-baker-telvi-retro-runner-trainer-in-pale-blue/201621722-1-white?$n_640w$&wid=513&fit=constrain",
//           categories : "Shoes",
//           details: "Showcasing its signature style through key separates and statement party dresses, Ted Baker is renowned for bringing a contemporary edge to classic styles. Combining a vibrant colour palette with off-beat prints, applique embellishment and playful detailing, the brand features clothing, footwear, swimwear and accessories across its collections, with some lines exclusive to ASOS. " 
//       },

//       {
//           name: "Reebok Classics CL Legacy trainers in navy",
//           price: "1500",
//           url: "https://images.asos-media.com/products/reebok-classics-cl-legacy-trainers-in-navy/22201784-1-navy?$n_640w$&wid=513&fit=constrain",
//           categories : "Shoes",
//           details: "Since 1895, Reebok's ancestor company have been developing their line of running shoes and trainers. With the brand launched in its own right in 1958, Reebok have aligned themselves with some of the world's top athletes, continually building upon their own heritage and authenticity through high performance credentials and innovative technology. " 
//       },

//       {
//           name: "New Balance 237 trainers in off white and beige",
//           price: "1200",
//           url: "https://images.asos-media.com/products/new-balance-237-trainers-in-off-white-and-beige/23718892-1-offwhite?$n_640w$&wid=513&fit=constrain",
//           categories : "Shoes",
//           details: "Godfather of the dad-trainer aesthetic, New Balance has been flexing its footwear and clothing credentials for over 100 years. The brand’s supportive running trainers are all the motivation you need, while its retro lifestyle shoes are your go-tos for added style props. Scroll everything from T-shirts, leggings and accessories in our New Balance at ASOS edit, plus training tops and sports bras in a range of slick colourways. " 
//       },

//       {
//           name: "Obey eyes logo hoodie in off white",
//           price: "850",
//           url: "https://i.pinimg.com/736x/ad/b8/1a/adb81ad54978287de2c65f5a2ea14b2a.jpg",
//           categories : "Clothing",
//           details: "First thought up in the shadow of Europe’s highest peak, the Monte Bianco, outdoors-loving brand Napapijri has been combining innovative materials with close attention to style since 1987. Take cover when the temperature drops in its technical ski jackets and trousers. " 
//       },

//       {
//           name: "Obey icon eyes hoodie in black",
//           price: "750", 
//           url: "https://images.asos-media.com/products/obey-icon-eyes-hoodie-in-black/201161954-1-black?$n_640w$&wid=513&fit=constrain",
//           categories : "Clothing",
//           details: "Founded in 2001, US streetwear label Obey is an extension of graffiti artist Shepard Fairey’s street and fine art campaign. Moving his populist views from the canvas to clothing, Fairey draws on workwear and military design influences across a selection of sweatshirts, print T-shirts and hoodies. " 
//       },

//       {
//           name: "Calvin Klein ASOS Exclusive reverse chest logo hoodie in grey", 
//           price: "650", 
//           url: "https://images.asos-media.com/products/calvin-klein-jeans-logo-trim-hoodie-in-grey/200815944-1-marblegrey?$n_640w$&wid=513&fit=constrain",
//           categories : "Clothing",
//           details: "Nobody does casual-cool like Calvin Klein. The designer brand’s minimal aesthetic and iconic CK logo are an easy way to level up any look. Scroll our Calvin Klein at ASOS edit for casual dresses, T-shirts, jeans and jackets, as well as fresh loungewear options to keep your off-duty aesthetic on point. Back to basics? Check out our pick of its cult-status bras, briefs and lingerie sets, plus swimwear and accessories for all-year-round style points. " 
//       },

//       {
//         name: "AJ Morgan womens oversized square sunglasses in gold", 
//         price: "350", 
//         url: "https://images.asos-media.com/products/aj-morgan-womens-oversized-square-sunglasses-in-gold/23831613-1-gold1?$n_640w$&wid=513&fit=constrain",
//         categories : "sunglasses",
//         details: "Creating a snappy range of fashion eyewear and sunglasses, American label AJ Morgan Eyewear has seen its lenses appear in cult films and television series such as, Demolition Man, Beverly Hills 90210, and Ugly Betty. Look to a distinctive collection, as oversized circle lens sunglasses sit alongside colourful print aviators and geek chic clear lens glasses in pastel shades. " 
//       },

//       {
//         name: "New Look round sunglasses in tortoise shell", 
//         price: "320", 
//         url: "https://images.asos-media.com/products/new-look-round-sunglasses-in-tortoise-shell/23154209-1-tortoiseshell?$n_640w$&wid=513&fit=constrain",
//         categories : "sunglasses",
//         details: "Since setting up shop in the 60s, New Look has become a high-street classic known for creating universally loved, wardrobe-ready collections. Shop the New Look at ASOS edit, featuring everything from chic LBDs and printed dresses to all-important accessories and figure-flattering jeans (if you’re anything like us, you’re always on the hunt for those). While you’re there, check out the label’s cute-yet-classy tops and blouses for your next ‘jeans and a nice top’ day. " 
//       },

//       {
//         name: "Ray-Ban round sunglasses in black 0rb2180", 
//         price: "300", 
//         url: "https://images.asos-media.com/products/ray-ban-round-sunglasses-in-black-0rb2180/201777683-1-black?$n_640w$&wid=513&fit=constrain",
//         categories : "sunglasses",
//         details: "First produced for the U.S. Air Force, Ray-Ban has been making iconic sunglasses since 1937. With a rich pop culture history, Ray-Ban has gained global recognition, a cult fan-base and A-list credentials. Opt for classic frames in Aviator, Wayfarer or Clubmaster styles. " 
//       },

//       {
//         name: "Nike bucket hat with logo in white", 
//         price: "380", 
//         url: "https://images.asos-media.com/products/nike-bucket-hat-with-logo-in-white/22496284-1-white?$n_640w$&wid=513&fit=constrain",
//         categories : "Hat&Cap",
//         details: "Key players in everything activewear-related, it doesn’t get more iconic than Nike. Sporting some of the most wanted trainers in the game, browse Air Max 90s and Air Force 1s, as well as Blazer and Waffle One styles. Get off-duty looks down with tracksuits, T-shirts and accessories in our Nike at ASOS edit, or scroll performance leggings and sports bras from Nike Training and Nike Running for an extra dose of motivation. " 
//       },

//       {
//         name: "Jack & Jones logo cap in black", 
//         price: "350", 
//         url: "https://images.asos-media.com/products/jack-jones-logo-cap-in-black/201848775-1-black?$n_640w$&wid=513&fit=constrain",
//         categories : "Hat&Cap",
//         details: "Founded in the 90s as a jeanswear brand, Danish label Jack & Jones has since gone on to expand its sartorial offering to include everything from jumpers, jackets and T-shirts to shoes, underwear and accessories (alongside more of its flex-worthy denim, of course). Scroll the Jack & Jones at ASOS edit to check out our latest drop of the brand’s laid-back pieces. " 
//       },

//       {
//         name: "Jordan baseball cap in white with jumpman logo", 
//         price: "420", 
//         url: "https://images.asos-media.com/products/jordan-baseball-cap-in-white-with-jumpman-logo/23553772-1-white?$n_640w$&wid=513&fit=constrain",
//         categories : "Hat&Cap",
//         details: "Inspired by the legend and the court, Nike Jordan pushes the boundaries of sportswear and lifestyle apparel with its iconic trainers, clothing and accessories. After the release of the original Air Jordan trainers in 1984, the brand has gone from strength to strength, both on and off the court. Shop our Jordan at ASOS edit to find some of the freshest kicks and streetwear pieces, all emblazoned with the brand’s signature Jumpman logo. " 
//       },

//       {
//         name: "Valentino Bags Kylo large logo backpack in black", 
//         price: "1950", 
//         url: "https://images.asos-media.com/products/valentino-bags-kylo-large-logo-backpack-in-black/14336011-1-black?$n_640w$&wid=513&fit=constrain",
//         categories : "Bags",
//         details: "Carryall line-up in need of an upgrade? Make VALENTINO BAGS your new flex. Pairing luxury aesthetic with traditional techniques and cutting-edge design, its latest drop of bags is doing the most. Think everything from backpacks and bum bags in the brand’s signature finishes to small leather accessories like belts and wallets. Scroll the VALENTINO BAGS at ASOS edit for our favourite picks. " 
//       },

//       {
//         name: "Tommy Hilfiger downtown flag backpack in black", 
//         price: "2150", 
//         url: "https://images.asos-media.com/products/tommy-hilfiger-downtown-flag-backpack-in-black/202333926-1-black?$n_640w$&wid=513&fit=constrain",
//         categories : "Bags",
//         details: "Whether it’s an embroidered logo, a bold graphic print or its iconic red, white and blue colour-blocking, there’s no mistaking Tommy Hilfiger. Flying the flag for all things retro 90s, scroll our Tommy Hilfiger at ASOS edit, featuring wardrobe-ready casualwear – think T-shirts, sweatshirts and joggers, as well as smart shirts, accessories, underwear and swimwear. Shop Tommy Jeans for classic denim pieces, or filter by Tommy Sport for workout gear that’ll get you motivated. " 
//       },

//       {
//         name: "Versace Jeans Couture new city rock pouch in black", 
//         price: "1750", 
//         url: "https://images.asos-media.com/products/versace-jeans-couture-new-city-rock-pouch-in-black/202084084-1-black?$n_640w$&wid=513&fit=constrain",
//         categories : "Bags",
//         details: "Part high fashion, part street style, Versace Jeans Couture sits between the two. Founded by Donatella and Gianni Versace, the brand’s range of clothing and accessories takes classic denim and brings it bang up to date. Shop the Versace Jeans Couture at ASOS edit for everything from jeans, logo T-shirts and hoodies to bags and trainers, with gold-tone stitching, new-season denim and over-indulgent prints featuring heavily. " 
//       }
//   ];

function seedDB(){
    Cart.remove({}, function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("Data removal complete!");
        //     data.forEach(function(seed){
        //         Products.create(seed, function(err, product){
        //             if(err){
        //                 console.log(err);
        //             }
        //             else{
        //                 console.log('New data added!');
        //                 // Review.create({
        //                 //     author: 'Palm Kumpanat',
        //                 //     text: 'That Awesome!'

        //                 // }, function(err, review){
        //                 //     if(err){
        //                 //         console.log(err);
        //                 //     }
        //                 //     else{
        //                 //         product.reviews.push(review);
        //                 //         product.save();
        //                 //     }
        //                 // });

        //             }
        //         });
        //     });
         }
    })
}

module.exports = seedDB;