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