const mongoose  = require('mongoose'),
      Products  = require('./models/product'),
      Review    = require('./models/review');

const data = [

      {
          name: "Ted Baker Telvi retro runner trainer in pale blue",
          price: "1250",
          url: "https://images.asos-media.com/products/ted-baker-telvi-retro-runner-trainer-in-pale-blue/201621722-1-white?$n_640w$&wid=513&fit=constrain",
          details: "Showcasing its signature style through key separates and statement party dresses, Ted Baker is renowned for bringing a contemporary edge to classic styles. Combining a vibrant colour palette with off-beat prints, applique embellishment and playful detailing, the brand features clothing, footwear, swimwear and accessories across its collections, with some lines exclusive to ASOS. " 
      },

      {
          name: "Reebok Classics CL Legacy trainers in navy",
          price: "1500",
          url: "https://images.asos-media.com/products/reebok-classics-cl-legacy-trainers-in-navy/22201784-1-navy?$n_640w$&wid=513&fit=constrain",
          details: "Since 1895, Reebok's ancestor company have been developing their line of running shoes and trainers. With the brand launched in its own right in 1958, Reebok have aligned themselves with some of the world's top athletes, continually building upon their own heritage and authenticity through high performance credentials and innovative technology. " 
      },

      {
          name: "New Balance 237 trainers in off white and beige",
          price: "1200",
          url: "https://images.asos-media.com/products/new-balance-237-trainers-in-off-white-and-beige/23718892-1-offwhite?$n_640w$&wid=513&fit=constrain",
          details: "Godfather of the dad-trainer aesthetic, New Balance has been flexing its footwear and clothing credentials for over 100 years. The brand’s supportive running trainers are all the motivation you need, while its retro lifestyle shoes are your go-tos for added style props. Scroll everything from T-shirts, leggings and accessories in our New Balance at ASOS edit, plus training tops and sports bras in a range of slick colourways. " 
      },

      {
          name: "Obey eyes logo hoodie in off white",
          price: "850",
          url: "https://i.pinimg.com/736x/ad/b8/1a/adb81ad54978287de2c65f5a2ea14b2a.jpg",
          details: "First thought up in the shadow of Europe’s highest peak, the Monte Bianco, outdoors-loving brand Napapijri has been combining innovative materials with close attention to style since 1987. Take cover when the temperature drops in its technical ski jackets and trousers. " 
      },

      {
          name: "Obey icon eyes hoodie in black",
          price: "750", 
          url: "https://images.asos-media.com/products/obey-icon-eyes-hoodie-in-black/201161954-1-black?$n_640w$&wid=513&fit=constrain",
          details: "Founded in 2001, US streetwear label Obey is an extension of graffiti artist Shepard Fairey’s street and fine art campaign. Moving his populist views from the canvas to clothing, Fairey draws on workwear and military design influences across a selection of sweatshirts, print T-shirts and hoodies. " 
      },

      {
          name: "Calvin Klein ASOS Exclusive reverse chest logo hoodie in grey", 
          price: "650", 
          url: "https://images.asos-media.com/products/calvin-klein-jeans-logo-trim-hoodie-in-grey/200815944-1-marblegrey?$n_640w$&wid=513&fit=constrain",
          details: "Nobody does casual-cool like Calvin Klein. The designer brand’s minimal aesthetic and iconic CK logo are an easy way to level up any look. Scroll our Calvin Klein at ASOS edit for casual dresses, T-shirts, jeans and jackets, as well as fresh loungewear options to keep your off-duty aesthetic on point. Back to basics? Check out our pick of its cult-status bras, briefs and lingerie sets, plus swimwear and accessories for all-year-round style points. " 
      },

      {
        name: "AJ Morgan womens oversized square sunglasses in gold", 
        price: "350", 
        url: "https://images.asos-media.com/products/aj-morgan-womens-oversized-square-sunglasses-in-gold/23831613-1-gold1?$n_640w$&wid=513&fit=constrain",
        details: "Creating a snappy range of fashion eyewear and sunglasses, American label AJ Morgan Eyewear has seen its lenses appear in cult films and television series such as, Demolition Man, Beverly Hills 90210, and Ugly Betty. Look to a distinctive collection, as oversized circle lens sunglasses sit alongside colourful print aviators and geek chic clear lens glasses in pastel shades. " 
      },

      {
        name: "New Look round sunglasses in tortoise shell", 
        price: "320", 
        url: "https://images.asos-media.com/products/new-look-round-sunglasses-in-tortoise-shell/23154209-1-tortoiseshell?$n_640w$&wid=513&fit=constrain",
        details: "Since setting up shop in the 60s, New Look has become a high-street classic known for creating universally loved, wardrobe-ready collections. Shop the New Look at ASOS edit, featuring everything from chic LBDs and printed dresses to all-important accessories and figure-flattering jeans (if you’re anything like us, you’re always on the hunt for those). While you’re there, check out the label’s cute-yet-classy tops and blouses for your next ‘jeans and a nice top’ day. " 
      },

      {
        name: "Ray-Ban round sunglasses in black 0rb2180", 
        price: "300", 
        url: "https://images.asos-media.com/products/ray-ban-round-sunglasses-in-black-0rb2180/201777683-1-black?$n_640w$&wid=513&fit=constrain",
        details: "First produced for the U.S. Air Force, Ray-Ban has been making iconic sunglasses since 1937. With a rich pop culture history, Ray-Ban has gained global recognition, a cult fan-base and A-list credentials. Opt for classic frames in Aviator, Wayfarer or Clubmaster styles. " 
      },

      {
        name: "Nike bucket hat with logo in white", 
        price: "300", 
        url: "https://images.asos-media.com/products/nike-bucket-hat-with-logo-in-white/22496284-1-white?$n_640w$&wid=513&fit=constrain",
        details: "Key players in everything activewear-related, it doesn’t get more iconic than Nike. Sporting some of the most wanted trainers in the game, browse Air Max 90s and Air Force 1s, as well as Blazer and Waffle One styles. Get off-duty looks down with tracksuits, T-shirts and accessories in our Nike at ASOS edit, or scroll performance leggings and sports bras from Nike Training and Nike Running for an extra dose of motivation. " 
      },

      {
        name: "Jack & Jones logo cap in black", 
        price: "300", 
        url: "https://images.asos-media.com/products/jack-jones-logo-cap-in-black/201848775-1-black?$n_640w$&wid=513&fit=constrain",
        details: "Founded in the 90s as a jeanswear brand, Danish label Jack & Jones has since gone on to expand its sartorial offering to include everything from jumpers, jackets and T-shirts to shoes, underwear and accessories (alongside more of its flex-worthy denim, of course). Scroll the Jack & Jones at ASOS edit to check out our latest drop of the brand’s laid-back pieces. " 
      },

      {
        name: "Jordan baseball cap in white with jumpman logo", 
        price: "300", 
        url: "https://images.asos-media.com/products/jordan-baseball-cap-in-white-with-jumpman-logo/23553772-1-white?$n_640w$&wid=513&fit=constrain",
        details: "Inspired by the legend and the court, Nike Jordan pushes the boundaries of sportswear and lifestyle apparel with its iconic trainers, clothing and accessories. After the release of the original Air Jordan trainers in 1984, the brand has gone from strength to strength, both on and off the court. Shop our Jordan at ASOS edit to find some of the freshest kicks and streetwear pieces, all emblazoned with the brand’s signature Jumpman logo. " 
      },

      {
        name: "adidas Running arm phone holder in black", 
        price: "750", 
        url: "https://images.asos-media.com/products/adidas-running-arm-phone-holder-in-black/24316196-1-black?$n_640w$&wid=513&fit=constrain",
        details: "adidas needs no introduction. The brand’s famous 3-Stripes can be seen on the track, field and in the latest streetwear trends. Scroll the adidas at ASOS edit to get your fix, from fresh trainers from the iconic Superstar, Stan Smith, Gazelle and Continental 80 collections to archive-inspired adidas Originals tracksuits, T-shirts and sweatshirts. And if you’re in need of some fresh kit, then cop yourself some sweat-wicking shorts, vests and compression tights from adidas Performance. " 
      },

      {
        name: "Nike Club Fleece headband in dark pink", 
        price: "550", 
        url: "https://images.asos-media.com/products/nike-club-fleece-headband-in-dark-pink/24396731-1-pink?$n_640w$&wid=513&fit=constrain",
        details: "Key players in everything activewear-related, it doesn’t get more iconic than Nike. Sporting some of the most wanted trainers in the game, browse Air Max 90s and Air Force 1s, as well as Blazer and Waffle One styles. Get off-duty looks down with tracksuits, T-shirts and accessories in our Nike at ASOS edit, or scroll performance leggings and sports bras from Nike Training and Nike Running for an extra dose of motivation. " 
      },

      {
        name: "Puma Running phone holder in black", 
        price: "650", 
        url: "https://images.asos-media.com/products/puma-running-phone-holder-in-black/24308571-1-black?$n_640w$&wid=513&fit=constrain",
        details: "Disrupting the game since 1948, PUMA is out to set and smash goals in its bid to be the fastest sports brand in the world. Scroll the PUMA at ASOS edit for the pieces we’re rating right now, from staple comfies like joggers, hoodies and sweatshirts to caps, bags and trainers. On that training hype? Check out our pick of its game-changing activewear, including sweat-wicking tops and shorts designed to level up your workouts. " 
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
                        Review.create({
                            author: 'Palm Kumpanat',
                            text: 'That Awesome!'

                        }, function(err, review){
                            if(err){
                                console.log(err);
                            }
                            else{
                                product.reviews.push(review);
                                product.save();
                            }
                        });

                    }
                });
            });
        }
    });
}

module.exports = seedDB;