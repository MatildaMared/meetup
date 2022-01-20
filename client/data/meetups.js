const meetups = [
  {
    id: 1,
    ownerId: 1736,
    title: "Kodkväll för nybörjare",
    category: "programming",
    description:
      "Cat ipsum dolor sit amet, it's 3am, time to create some chaos bathe private parts with tongue then lick owner's face hell is other people so cat sit like bread. Lay on arms while you're using the keyboard put butt in owner's face or make it to the carpet before i vomit mmmmmm and claw drapes, and refuse to drink water except out of someone's glass. Why dog in house? i'm the sole ruler of this home and its inhabitants smelly, stupid dogs, inferior furballs time for night-hunt, human freakout mice blow up sofa in 3 seconds why can't i catch that stupid red dot. Kitty time. Steal mom's crouton while she is in the bathroom instead of drinking water from the cat bowl, make sure to steal water from the toilet and intrigued by the shower, but give me attention or face the wrath of my claws scratch me now! stop scratching me! scratch my tummy actually i hate you now fight me yet the cat was chasing the mouse. Kitty loves pigs eat owner's food, get video posted to internet for chasing red dot so jump on human and sleep on her all night long be long in the bed, purr in the morning and then give a bite to every human around for not waking up request food, purr loud scratch the walls, the floor, the windows, the humans and mark territory, but intently sniff hand. Cats are a queer kind of folk hate dogs, for flee in terror at cucumber discovered on floor, yet kitty poochy i vomit in the bed in the middle of the night.",
    date: new Date("2022-02-18T18:00:00"),
    location: "Mr Cake, Lilla Badhusgatan 2b, Göteborg",
    imgUrl:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80",
    attendees: [
      { name: "Matilda", id: 1736 },
      { name: "Sofia", id: 1319 },
      { name: "Sara", id: 7382 },
    ],
    comments: [
      {
        name: "Matilda",
        comment: "This is a great meetup!",
      },
    ],
  },
  {
    id: 2,
    ownerId: 1736,
    title:
      "Pokémon meetup (vi livesänder speedrun av pokémon Emerald på Twitch!)",
    category: "gaming",
    description:
      "Cat ipsum dolor sit amet, find a way to fit in tiny box for fooled again thinking the dog likes me, mice. Twitch tail in permanent irritation groom forever, stretch tongue and leave it slightly out, blep touch water with paw then recoil in horror lounge in doorway, for find box a little too small and curl up with fur hanging out . Ears back wide eyed kitty power i like to spend my days sleeping and eating fishes that my human fished for me we live on a luxurious yacht, sailing proudly under the sun, i like to walk on the deck, watching the horizon, dreaming of a good bowl of milk and eat my own ears good morning sunshine. Fight an alligator and win roll on the floor purring your whiskers off yet meow to be let out yet hiding behind the couch until lured out by a feathery toy lay on arms while you're using the keyboard. Pet my belly, you know you want to; seize the hand and shred it! oooo! dangly balls! jump swat swing flies so sweetly to the floor crash move on wash belly nap but nya nya nyan. X chase imaginary bugs, but cats go for world domination or experiences short bursts of poo-phoria after going to the loo. Howl on top of tall thing steal the warm chair right after you get up, curl up and sleep on the freshly laundered towels meow for food, then when human fills food dish, take a few bites of food and continue meowing. If it fits, i sits. I hate cucumber pls dont throw it at me. Meow cat walks in keyboard .",
    date: new Date("2022-02-12T19:00:00"),
    location: "Kaptensgatan 10E, Halmstad",
    imgUrl:
      "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
    attendees: [
      { name: "Matilda", id: 1736 },
      { name: "Sara", id: 7382 },
    ],
    comments: [],
  },
  {
    id: 3,
    ownerId: 1319,
    title: "Raid-night in Final Fantasy XIV",
    category: "gaming",
    description:
      "Lets start of the evening with some chatting and a cup of hot chocolate in Discord. When are are all warm enough in our clothes, we'll set up parties and throw down all the stuff in the kitchen fooled again thinking the dog likes me play riveting piece on synthesizer keyboard chew on cable missing until dinner time. Licks your face milk the cow. Who’s the baby chirp at birds lounge in doorway for Gate keepers of hell mrow rub whiskers on bare skin act innocent jumps off balcony gives owner dead mouse at present then poops in litter box snatches yarn and fights with dog cat chases laser then plays in grass finds tiny spot in cupboard and sleeps all day jumps in bathtub and meows when owner fills food dish the cat knocks over the food dish cat slides down the water slide and into pool and swims even though it does not like water.",
    date: new Date("2022-01-29T19:30:00"),
    location: "Distance",
    imgUrl:
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    attendees: [
      { name: "Sofia", id: 1319 },
      { name: "Matilda", id: 1736 },
      { name: "Sara", id: 7382 },
    ],
    comments: [
      {
        name: "Sofia",
        comment:
          "It's going to be an awsome night, with chot choclate, ice cream, laughter and alot of gaming.",
      },
      {
        name: "Matilda",
        comment:
          "I'm not sure we'll survive this, but I guess it will be awsome anyhow.",
      },
    ],
  },
  {
    id: 4,
    ownerId: 7382,
    title: "My Neighbour Totoro - movie night",
    category: "Anime",
    description:
      "I'll set up the tables wiht crisps, dip and some bubbly. Nap all day cat dog hate mouse eat string barf pillow no baths hate everything but kitty poochy. Sleep on keyboard toy mouse squeak roll over. Mesmerizing birds. Poop on grasses licks paws destroy couch intently sniff hand. The dog smells bad gnaw the corn cob.",
    date: new Date("2022-01-22T20:00:00"),
    location: "Majorna, Göteborg",
    imgUrl:
      "https://images.unsplash.com/photo-1544253448-af7a0dcb2637?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
    attendees: [
      { name: "Sofia", id: 1319 },
      { name: "Sara", id: 7382 },
    ],
    comments: [
      {
        name: "Matilda",
        comment:
          "It's so sad I can't attend, I love Totoro, but Markus invited me to a SPA date, so I guess I'll have to attend to that, even though it's not even half as fun.",
      },
    ],
  },
  {
    id: 5,
    ownerId: 1319,
    title: "Let's React",
    category: "programming",
    description:
      "Lunchdate with programming! Meow all night having their mate disturbing sleeping humans lick yarn hanging out of own butt, pet right here, no not there, here, no fool, right here that other cat smells funny you should really give me all the treats because i smell the best and omg you finally got the right spot and i love you right now but white cat sleeps on a black shirt. Meow behind the couch, or throw down all the stuff in the kitchen ears back wide eyed find something else more interesting.",
    date: new Date("2022-02-28T12:00:00"),
    location: "Mr Cake, Lilla Badhusgatan 2b, Göteborg",
    imgUrl:
      "https://images.unsplash.com/photo-1582005450386-52b25f82d9bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    attendees: [
      { name: "Sofia", id: 1319 },
      { name: "Sara", id: 7382 },
      { name: "Matilda", id: 1736 },
    ],
    comments: [
      {
        name: "Matilda",
        comment:
          "Yeah!! I'm about to make a beautifully made webapp, that will help find the puuuuurrfect owner for a little kitten, at the same time as drinking a lovely cup of coffee!",
      },
      {
        name: "Sara",
        comment:
          "I'll be there!! It's going to be wonderful to see the girls again, and have a cool coding session at the same time!",
      },
    ],
  },
  {
    id: 5,
    ownerId: 7382,
    title: "It's a me - Mario!",
    category: "gaming",
    description:
      "Mario gaming all day long! Scream at teh bath. My left donut is missing, as is my right the dog smells bad and loves cheeseburgers, refuse to drink water except out of someone’s glass. Flee in terror at cucumber discovered on floor sleep nap or gnaw the corn cob give me attention or face the wrath of my claws. Lounge in doorway groom yourself 4 hours – checked, have your beauty sleep 18 hours – checked, be fabulous for the rest of the day – checked so poop on grasses, but refuse to leave cardboard box and small kitty warm kitty little balls of fur so walk on car leaving trail of paw prints on hood and windshield eat the fat cats food. Ears back wide eyed kitty poochy and jump on human and sleep on her all night long be long in the bed, purr in the morning and then give a bite to every human around for not waking up request food, purr loud scratch the walls, the floor, the windows, the humans but playing with balls of wool find something else more interesting, cough furball.",
    date: new Date("2022-03-06T12:00:00"),
    location: "Göteborg",
    imgUrl:
      "https://images.unsplash.com/photo-1627856013841-4845e538d3ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    attendees: [
      { name: "Sofia", id: 1319 },
      { name: "Sara", id: 7382 },
      { name: "Matilda", id: 1736 },
    ],
    comments: [
      {
        name: "Sara",
        comment:
          "Hope you're all as excited as I am, cause I've been practicing Super Mario for 2 monthes now...!",
      },
    ],
  },
];

export default meetups;
