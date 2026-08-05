export type OriginalTheorySection = {
  id: string;
  title: string;
  content: string;
};

export const originalTheorySections: OriginalTheorySection[] = [
  {
    id: "models-training-and-generalization",
    title: "Models, Training & Generalization",
    content: String.raw`we'll answer a deeper question.
Imagine you walk into the office and see a GPU server training a model.
Millions of numbers are changing every second.
You might naturally wonder:
"What exactly is the computer doing?"
Is it reading books?
Is it memorizing Wikipedia?
Is it downloading knowledge?
Not really.
What it's actually doing is adjusting millions—or even billions—of tiny numerical parameters until it becomes good at making predictions.
That may sound abstract, so let's step away from computers for a moment.


===


Opening an Indian Restaurant
Suppose you've always wanted to open a restaurant.
You're an excellent software engineer, but you've never cooked professionally.
On opening day, your first customer orders Butter Chicken.
You prepare it using a recipe you found online.
The customer takes one bite and says,
"It's good... but it's too salty."
What do you do?
You don't throw away the entire recipe.
You simply reduce the salt slightly.
The next customer says,
"Better, but now it needs a little more cream."
Again, you don't start over.
You make another small adjustment.
Day after day...
Customer after customer...
Dish after dish...
Tiny improvements slowly accumulate.
Eventually people start saying,
"This is the best Butter Chicken in town."
At no point did someone hand you the perfect recipe.
You learned through feedback.
That is the essence of Machine Learning.


===


What Is a Model?
Let's return to our restaurant.
People often hear the word model and imagine something mysterious.
In reality, a model is simply the thing making decisions.
In our restaurant, that's the chef.
Customers don't interact with recipes directly.
They interact with the chef's decisions.
Should this dish be spicy?
Should it contain garlic?
Should the sauce be thicker?
The chef combines experience to make those choices.
An AI model plays the same role.
It receives an input and produces an output based on everything it learned during training.
The model isn't the data.
It isn't the training process.
It's the decision-maker that emerges after learning.


====

Where Is the Knowledge Stored?
Now comes an interesting question.
If the chef has cooked for ten years, where is that experience stored?
Not in a notebook.
Not in a recipe book.
It's stored in thousands of tiny instincts developed over time.
Maybe they instinctively know when onions are perfectly browned.
Maybe they recognize the smell of burnt spices before anyone else.
Experience becomes internal.
AI stores experience in a surprisingly similar way.
Instead of instincts, it stores billions of numerical values called weights.
Weights are simply numbers.
But together, they represent everything the model has learned.
No single weight means,
"This is how to answer questions about cricket."
Instead, knowledge is distributed across an enormous network of numbers working together.


====

The goal isn't perfection.
The goal is producing consistently good results across many different situations.
That is why machine learning focuses on generalization rather than memorization.
A model that memorizes its training data may appear brilliant during practice but perform poorly on real-world problems.
Remember this principle:
The goal is never to minimize training error—it's to minimize generalization error.
A simple analogy:
- Underfitting: A student who barely studied and performs poorly on both the practice quiz and the final exam.
- Overfitting: A student who memorized the exact practice questions but struggles on the final because the questions are different.
- Good learning: A student who understands the concepts and performs consistently well on both.
That's exactly what AI training aims for.`,
  },
  {
    id: "learning-language-and-evaluation",
    title: "Learning, Language & Evaluation",
    content: String.raw`Supervised, unsupervised, and reinforcement — three different classrooms
Think of these as three completely different teaching setups for the same student.
Supervised learning is the most common one, and it's like a teacher who gives you a worksheet with the answer key already filled in for practice problems. You study the worked examples — here's the input, here's the correct output — and your job is to get good enough at spotting the pattern that when a new, unlabeled problem shows up, you can produce the right answer yourself. Almost everything you'll build early in your career is supervised: predicting house prices from square footage (that's regression — predicting a number), or predicting whether an email is spam (that's classification — predicting a category). The QA parallel here is almost exact: you're training on a labeled bug database where every ticket already says "this was a real bug" or "this was user error," and the model learns to make that same call on new tickets.
Unsupervised learning is the opposite situation — there's no answer key at all. Imagine handing a new employee a giant pile of unsorted customer support tickets with no categories assigned, and asking them to just start noticing which ones seem to cluster together naturally, without telling them in advance what the categories should even be. The model isn't predicting a known right answer — it's finding structure that wasn't labeled for it. This is how customer segmentation works, or anomaly detection — flagging "this transaction doesn't look like the others" without ever having been told what fraud looks like beforehand.
Reinforcement learning is a different setup entirely — there's no dataset at all upfront. Instead, imagine training a dog with treats: the model takes an action, gets a reward or penalty based on the outcome, and gradually learns a strategy that maximizes reward over time, purely through trial and consequence. This is how game-playing AI and robotics are often trained, and it's a smaller slice of what you'll likely touch early on, but it's worth knowing it exists as its own category.
Almost every job posting you'll see is asking for supervised learning skill first, so that's rightly where your 90-concept list and study time should be weighted.


===

What a model is actually "looking at": features and labels
Here's a concept that sounds simple but is worth sitting with, because getting it wrong is the single most common beginner mistake, and it's very QA-adjacent.
A feature is one piece of input information the model gets to look at — think of it like one column in a spreadsheet. A label is the correct answer you're trying to predict — the thing you're asking the model to figure out. If you're predicting house prices, the features are square footage, number of bedrooms, location, age of the house — and the label is the actual sale price.
The subtle trap here is something ML engineers call data leakage, and it's basically the ML equivalent of a test environment that accidentally has production data seeded into it, making your tests pass for the wrong reasons. Data leakage happens when one of your features accidentally contains information that wouldn't actually be available at prediction time — for instance, if you're predicting whether a loan will default, and one of your "features" is actually "was this loan sent to collections," that's cheating, because that fact only exists after the default already happened. Your model will look breathtakingly accurate in testing and then fail completely in the real world, because it learned to peek at the answer instead of learning the actual pattern. Catching this kind of thing is exactly the instinct a QA background gives you — you're used to asking "wait, how would this actually behave in the real environment, not just in this convenient test setup?"


===

Classification vs. regression — the two most common jobs you'll be asked to do
It's worth being precise about this distinction early, because people mix up the vocabulary constantly.
Regression is when you're predicting a continuous number — a price, a temperature, a probability, a duration. There's no fixed set of possible answers; it could be any value on a scale.
Classification is when you're predicting a category from a fixed, known set of choices — spam or not spam, cat or dog, approve or deny. Even when there are many categories, the key trait is that the possible answers are a closed list, not an open range.
The reason this distinction matters so much is that it decides your entire evaluation toolkit. You can't use "accuracy" to judge a regression model predicting house prices — there's no such thing as "exactly right" when predicting a continuous number, so you instead measure how far off the prediction was, on average, across all your test cases. Meanwhile, for classification, you're back in the wolf-and-village world from yesterday — false alarms versus missed detections — because there genuinely are discrete right and wrong categories to be right or wrong about.


===

How Can a Machine Understand Language?

Imagine I type this into ChatGPT.
"Tell me a joke."
Within seconds it replies.
Now imagine I ask,
"Explain Quantum Physics to a ten-year-old."
Again, it answers.

How is that possible?



Inside the computer there are only two things.

Electricity

0

1

That's it.
No English.
No Spanish.
No Java.


Break Everything Into Pieces
Suppose I give you a giant pizza.
Would you eat it whole?
Of course not.
You slice it.
Language works the same way.
Instead of processing an entire sentence at once...
AI cuts it into smaller pieces.
These pieces are called
Tokens
Notice...
Not necessarily words.
Tokens.


===


Why Not Simply Use Words?
Great question.
Imagine creating a dictionary.
English has hundreds of thousands of words.
Now add
French.
Spanish.
Hindi.
Japanese.
Chinese.
Programming languages.
Medical terminology.
Company names.
Product names.
New slang every week.
The dictionary would never stop growing.
Instead...
AI learns smaller building blocks.
Very similar to Lego bricks.
With enough Lego pieces...
You can build
a house.
a car.
a castle.
a spaceship.
With enough tokens...
AI can represent almost any sentence.


Tokens Are Like LEGO Pieces
Imagine your child has a LEGO box.
The box doesn't contain

Hospital

Airport

Police Station

Instead it contains

small blocks

Those tiny blocks combine into thousands of creations.
Tokens are exactly the same.
Instead of memorizing every possible sentence...
AI learns reusable language pieces.
That's far more efficient.


But Tokens Still Don't Mean Anything


Suppose I give you three words.

Dog

Cat

Car

To a computer...
Initially...
All three are equally meaningless.
Just labels.


Should "Dog" live next to "Car"?
Probably not.

Should "Doctor" live near "Hospital"?
Absolutely.
Should "Pizza" live near "Restaurant"?
Definitely.
Slowly...
A beautiful city begins to emerge.
Related concepts naturally become neighbors.
Unrelated concepts end up on opposite sides of town.
That city is called an
Embedding Space


An embedding is simply
A numerical representation of meaning.
Not spelling.
Not pronunciation.
Meaning.


Think of every word, sentence, paragraph, image, or even an entire document as being assigned a location in a huge multi-dimensional map.
Things with similar meanings end up close together.
Things with different meanings end up farther apart.


=====

Suppose someone asks

Where can I adopt a puppy?

Your company knowledge base contains

Local dog shelters

Notice something.
The question never used

dog shelters

The document never used

adopt puppy

Yet AI still finds the right document.
Why?
Because

puppy

dog

adoption

pet shelter

all live close together in embedding space.
This ability to understand semantic similarity rather than exact wording is what makes modern AI systems feel intelligent.


====

Why This Changed Everything
Before embeddings, search engines mostly relied on keywords.
If your document contained the exact word you searched for, you had a good chance of finding it.
If it didn't, you might miss the relevant information entirely.
Embeddings transformed this.
Now systems can retrieve information based on meaning rather than literal word matches.
That's why asking:
"How do I reset my password?"
can still find a document titled:
"Account credential recovery."
Different words.
Same intent.


=====


AI doesn't experience language the way humans do.
It doesn't have memories, emotions, or consciousness tied to words.
What it does have is an extraordinarily sophisticated statistical representation of relationships between concepts.
For engineering purposes, that's often enough to solve remarkably complex problems.


====


Why Every AI Engineer Needs to Understand Embeddings
You will hear this word constantly:
* Vector Database
* Similarity Search
* RAG
* Semantic Search
* Recommendation Systems
* Memory
* Retrieval
At the heart of all of them is one idea:
Represent information as embeddings, then compare those embeddings to find related meaning.
Once you understand embeddings, many "advanced" AI concepts suddenly become much easier to grasp.


====




Bias and variance — two different kinds of "wrong"
Imagine four different archers shooting at a target, and you're watching where their arrows land.
One archer's arrows all cluster tightly together, but way off to the left of the bullseye — consistent, but consistently wrong. That's high bias: the model has a systematic, repeated error because it's too simple to capture what's actually going on. It's making the same kind of mistake over and over, no matter what data you give it. This is the underfitting archer — think of a model trying to predict house prices using only "number of bedrooms" and ignoring everything else. It'll be wrong in the same direction again and again, because it's missing too much information to ever get close.
A second archer's arrows are scattered wildly all over the target — sometimes near the bullseye, sometimes far in any direction, no consistent pattern. That's high variance: the model is too sensitive to the specific data it was trained on. Show it a slightly different training set, and it produces a wildly different model. This is your overfitting student from Day 1 — the one who memorized the practice quiz's exact wording. Change the practice quiz even slightly, and their performance swings wildly, because they never learned anything stable.
The best archer's arrows cluster tightly, right around the bullseye — that's what you're actually chasing: low bias and low variance at once.


====


The uncomfortable truth of ML, though, is that these two things trade off against each other. Make a model simpler to reduce its wild variance, and you usually push it toward more consistent bias. Make it more complex to capture more nuance and reduce bias, and it usually becomes more sensitive to the noise in whatever data it happened to see, increasing variance. Almost every technique you'll learn in ML is, underneath, a tool for walking this tightrope — and every single "which model should I use" decision quietly involves this tradeoff whether people say so out loud or not.

====

Regularization — deliberately handicapping the model so it doesn't cheat
Once you understand overfitting as "the model latched onto noise instead of signal," the fix becomes intuitive: you need some way to actively discourage the model from getting too clever, too confident, too complex.


Regularization is exactly this — a deliberate penalty added during training that punishes the model for becoming overly complex or overly confident in any single feature, even if that complexity temporarily makes it look better on the training data.

One kind of regularization (L2) gently shrinks all the model's internal weights toward zero, spreading influence more evenly and discouraging any single feature from dominating — like a manager who insists no one team gets to hoard all the credit, so decisions stay balanced across the whole group. The other kind (L1) is more aggressive — it can push some weights all the way to exactly zero, effectively deciding certain features don't matter at all and cutting them out entirely — like a manager who looks at a bloated process and says "we don't need this step at all," removing it rather than just diluting it.

====

How you actually catch this in practice: train/validation/test splits


You never train and evaluate on the same data — we touched on this on Day 1 — but in practice, you actually need three separate pools, not two. The training set is what the model directly learns from. The validation set is a separate pool you use while building, to make decisions like "should I add more regularization?" or "is this model or that one better?" — it's your internal testing environment, used repeatedly during development. The test set is the one you touch only once, right at the very end, to get an honest, final read on how the model will perform in the real world — the equivalent of a final UAT sign-off that you don't want contaminated by earlier rounds of tweaking.

=====

The test set stays untouched specifically so you always have one clean, honest measurement left, no matter how much tuning happened before it.

====


When you don't have a lot of data to spare for a validation set, there's a technique called cross-validation — instead of carving out one fixed validation slice, you rotate through the data, using a different slice as validation each time and averaging the results.

====`,
  },
  {
    id: "transformers-and-attention",
    title: "Transformers & Attention",
    content: String.raw`The Breakthrough That Changed Everything

Most of modern AI exists because of one research paper published in 2017.
Its title was surprisingly bold.
**Attention Is All You Need**


**Before Transformers**
Let's travel back to around 2015.
Suppose I ask a computer to read this sentence.
"The little boy who was wearing a blue jacket and carrying a red football walked into the school because he was excited."
Seems easy.
You read it once.
You instantly understand it.
Older AI systems didn't.
Why?
Because they processed language like someone reading through a tiny keyhole.
They started with the first word.

**The**

Then

**little**

Then

**boy**

Then

**who**

One word at a time.
By the time they reached the end...
They had already forgotten many details from the beginning.
Imagine trying to understand a movie...
But you're only allowed to watch one frame every ten seconds.
That's what older language models felt like.



====

Your brain wasn't simply moving forward.
It was constantly looking backward.
It was making connections everywhere.
That ability inspired one of the greatest ideas in AI.


====

What Is Attention?

Ten people are talking.
Someone suddenly says,
"Raj, what do you think?"
Instantly...
Your attention shifts.
You ignore every other conversation.


Humans do this naturally.
We don't treat every word equally.
Some words are important.
Others are background noise.


Modern AI learned to do exactly the same thing.
Instead of reading every word with equal importance...
It asks,
**"Which earlier words should I pay attention to before deciding what this word means?"**
That's attention.


====

This is where things become fascinating.
Older AI read like this.

**Word 1**

**↓**

**Word 2**

**↓**

**Word 3**

**↓**

**Word 4**

A straight line.


Transformers changed everything.
Now it looks more like this.

**Word 1 ←→ Word 2**

**↑**           **↓**

**Word 3 ←→ Word 4**

**↑**     **↘︎**    **↑**

**Word 5 ←→ Word 6**

Every word can communicate with every other word.


Not just the previous one.
Not just the next one.
Every single one.
That's revolutionary.


====

**But Doesn't This Become Expensive?**
Excellent question.
Imagine a meeting with five people.
Everyone can talk to everyone else.
That's manageable.
Now imagine a conference with 50,000 people.
Suddenly...
Everyone talking to everyone becomes extremely expensive.
The exact same problem exists inside Transformers.
Longer conversations require dramatically more computation.
This is why companies invest enormous effort into techniques like efficient attention, sparse attention, sliding windows, and caching.


====

**So... What Is a Transformer?**
Many beginners imagine the Transformer is a single algorithm.
It's better to think of it as an architecture.
Like saying,
"A hospital."
A hospital isn't one room.
It contains emergency care, surgery, radiology, labs, pharmacies, nurses, and administration.
Similarly, a Transformer is a collection of components working together.
Some handle attention.
Some process information.
Some normalize outputs.
Some help the model learn efficiently.
Together, they form the engine behind modern language models.


=====

**Why Everyone Talks About the 2017 Paper**
Every few years, a research paper changes an industry.
The Transformer paper was one of those moments.
Not because it solved every problem.
But because it provided a much better way of understanding relationships in language.


Researchers used Transformers to build larger and larger models.
Those models eventually became GPT, Claude, Gemini, Llama, and many others.
It's similar to the invention of the smartphone.


====

The same applies to Transformers.
From the outside, you see a chatbot.
Underneath, billions of parameters are coordinating through attention, mathematical representations, and learned relationships across language, code, images, and more.


====`,
  },
  {
    id: "prompt-lifecycle-and-ml-algorithms",
    title: "Prompt Lifecycle & ML Algorithms",
    content: String.raw`What Actually Happens When You Press Enter?

Because that is the difference between using AI and engineering AI.
Today we'll follow one prompt from beginning to end.
Almost like following a package through Amazon's delivery system.


====

AI works exactly the same way.
You see

Question

↓

Answer

Behind the scenes...
Hundreds of operations happen.


===

Everything first becomes
Tokens.


Internally...
It becomes numbers.


The model does something very similar.
Using attention...
It activates relevant knowledge learned during training.


===


People often imagine ChatGPT doing this.

Google Search

↓

Reads Websites

↓

Writes Answer

Usually...
No.
The knowledge already exists inside the trained model.


Think back to our restaurant analogy.
An experienced chef doesn't open YouTube every time someone orders biryani.
Years of cooking already taught them the recipe.
Similarly...
A trained model already contains patterns learned during training.
Only when engineers explicitly connect external tools, web search, or databases does the model retrieve fresh information.
This distinction is very important.


====

engineering phrase is
The model performs probabilistic reasoning over learned representations.
That sounds intimidating.
But it simply means
It uses everything it learned to predict the most appropriate continuation.


====

Predicting the Next Token
Here comes one of the biggest surprises.
Everything ChatGPT does...
Starts with an incredibly simple task.
Predict
One
Next
Token.
That's all.


===

It saw that pattern millions of times.
Now imagine writing
Once upon a time there was a
The next likely token changes completely.
Now it predicts
King.
Princess.
Dragon.
Forest.
Not Paris.
Everything depends on context.


===

Why Can AI Be Creative?
Now someone asks,
"If it's always predicting the most likely word...
Why does it sometimes write funny stories?"
Excellent question.


Imagine asking three chefs to prepare the same pasta.
All three know the recipe.
Yet each one adds slightly different herbs.
One adds extra garlic.
Another adds basil.


The meal is recognizably pasta...
Yet each version is unique.
AI behaves similarly.
Instead of always choosing the single most likely next token...
Sometimes it intentionally introduces controlled randomness.
That randomness is controlled by a parameter called
Temperature


Higher temperature means
"Be more adventurous."
Lower temperature means
"Stay close to the safest prediction."
As AI engineers, you'll use this constantly.
Code generation?
Low temperature.
Creative storytelling?
Higher temperature.
Customer support?
Usually low.
Marketing slogans?
A bit higher.


====

Why the Same Prompt Can Produce Different Answers
Because probability isn't certainty.
Imagine asking three senior developers,
"What's the best way to structure this API?"
All three might recommend slightly different architectures.
None are necessarily wrong.
Each draws from experience.
LLMs behave similarly.
They often have several reasonable continuations.
Temperature determines how willing the model is to explore alternatives.


====

The API Call Is Only the Beginning
Many junior developers think,
"My job is calling the OpenAI API."
In reality...
The API call is often the smallest part of the system.
The real engineering happens around it.
* Building the prompt.
* Retrieving the right context.
* Calling tools.
* Validating responses.
* Handling failures.
* Managing cost.
* Caching repeated requests.
* Monitoring latency.
* Evaluating output quality.
That's AI Engineering.



=====

Linear regression

This is the simplest, oldest, underrated algorithm in ML, and it's the right place to start because almost every other technique is some elaboration on this idea

Linear regression's entire job is to draw a single straight line through that cloud of dots that comes as close as possible to all of them at once, not perfectly through any one of them, but minimizing the average distance across the whole group. Once that line exists, prediction becomes trivial — for any new house size, you just read straight up to the line and across to the price axis.


from Day 1: the model starts with a random line, measures how far off it is from all the real dots (this distance is the error, or loss), and nudges the line's slope and position slightly to reduce that error, over and over, until the line settles into the best fit it can find.


logistic regression is not used for predicting numbers — it's used for classification, for yes/no, spam/not-spam type questions.

logistic regression squashes that line through a mathematical function shaped like a soft "S" curve, which forces every output to land between 0 and 1 — and that output gets interpreted as a probability.



Think of it like a dimmer switch instead of an on/off switch: rather than declaring "definitely spam" or "definitely not spam," the model says "I'm 87% confident this is spam," and then a separate decision rule — usually "if above 50%, call it spam" — converts that probability into the final yes/no answer.

=====

Decision trees — learning by asking a series of yes/no questions

it mirrors exactly how a human would triage something manually

Picture the world's most efficient game of twenty questions. A decision tree looks at your data and asks a question — "is income above $50k?" — and splits everyone into two groups based on the answer. Then, within each of those groups, it asks another question — "is credit score above 700?" — splitting again. It keeps doing this, carving the data into smaller and smaller, increasingly pure groups, until it reaches a point where it's confident enough to make a final call.

a decision tree left unchecked will happily keep asking questions until it's carved out a tiny, hyper-specific rule for every single training example — which is about as textbook an overfitting trap as exists in ML. Left alone, a tree doesn't generalize; it memorizes.


====

Ensembles — why asking a committee beats asking one expert

This is the natural fix for a decision tree's overfitting problem, and it's one of the more genuinely clever ideas in classical ML.


Instead of trusting one deep, overfit decision tree, what if you trained hundreds of different, slightly different trees — each one seeing a slightly different random slice of the data and a slightly different random subset of features — and then just let them vote on the final answer? This is called a random forest, 

Any individual tester might have blind spots or get unlucky with their sample, but those blind spots are unlikely to line up across all hundred of them — so the group's combined answer ends up far more reliable than any single member's.


====


There's a second, more advanced ensemble idea called gradient boosting (the technique behind XGBoost, which you'll see constantly in real jobs and Kaggle competitions), and the intuition here is different — instead of many independent trees voting in parallel, boosting builds trees one at a time, in sequence, where each new tree is specifically trained to focus on and correct the mistakes the previous trees made. It's less like a panel of independent testers and more like a QA process where each reviewer is specifically briefed on exactly which bugs the last reviewer missed, so the whole team's blind spots shrink round after round.


=====


Neural networks — how "deep learning" actually works underneath the buzzword

Everything so far — linear regression, trees, ensembles — falls under "classical ML."

territory that powers image recognition, ChatGPT, and most of what people mean when they say "AI" now: neural networks.

====

The basic building block: a neuron is just a tiny decision-maker


Forget the brain metaphor for a second — it causes more confusion than it solves. A single artificial neuron is doing something very simple: it takes in several numbers, multiplies each one by an importance weight, adds them together, and passes the result through a small decision function to produce one output number.

Think of it like a hiring manager scoring a candidate. They don't just count "years of experience" alone — they weigh several factors (experience, communication skills, technical test score), give each one a different importance multiplier based on what matters most to them, add it all up into a single combined score, and then that score determines the outcome. That's one neuron.


====


The "weights" are exactly the importance multipliers, and — this is the key connection

those weights are precisely the numbers that gradient descent is nudging, example after example, during training.

===

Why "deep" — stacking layers to build up complexity



Here's the useful mental model: imagine an assembly line of increasingly senior reviewers looking at a résumé. The first-layer reviewer only checks very basic, surface-level things — "does this résumé have a degree listed, yes or no." That basic yes/no signal gets passed to a second-layer reviewer, who doesn't look at the résumé directly at all — they only see the outputs of the first layer, and they combine those simple signals into a slightly more sophisticated judgment, like "does this person look technically qualified overall." That judgment gets passed to a third layer, which combines it with other mid-level judgments into something even more abstract, like "is this person a strong overall fit." Each layer builds a more abstract, more useful representation out of the layer before it, without ever needing you to manually tell it what to look for.



This is actually the single biggest advantage neural networks have over classical ML: in linear regression or decision trees, you have to hand-engineer the useful features yourself — you decide that "income" and "credit score" matter. In deep learning, given enough data, the network figures out its own useful intermediate features on its own, layer by layer, which is exactly why deep learning became the dominant approach once large datasets and heavy compute became available — it scales in a way hand-engineered features never could.


====

Activation functions — why you need a "kink" in the decision


the activation function — a small non-linear "kink" applied after each neuron's weighted sum, before passing it to the next layer. Without it, deep networks couldn't learn anything a simple linear regression couldn't already learn.



The most common one today, called ReLU, is almost embarrassingly simple: if the number is negative, output zero; if it's positive, pass it through unchanged.

CNNs and RNNs — the same core idea, specialized for different data shapes



A plain, fully-connected neural network treats every input independently and equally, which works fine for structured spreadsheet data.

But images and language have structure — nearby pixels are related, and earlier words affect the meaning of later ones — and two specialized architectures were built to exploit that.

===

A CNN (Convolutional Neural Network) is built for images, and the intuition is a sliding magnifying glass. Instead of looking at the whole image at once, a small filter slides across the image piece by piece, learning to detect a simple local pattern — an edge, a curve, a patch of color — the same way it would appear anywhere in the photo.


Early layers detect these simple local patterns; deeper layers combine them into increasingly complex shapes — edges become eyes, eyes and a nose become a face. It's efficient specifically because it reuses the same small filter everywhere in the image, instead of learning a completely separate rule for every single pixel position.




An RNN (Recurrent Neural Network), and its modern evolution, the attention mechanism (the core idea behind ChatGPT and other language models), is built for sequences — language, time series, anything where order and context matter.



The core problem it solves: the meaning of a word depends heavily on the words around it. "Bank" means something completely different in "river bank" versus "savings bank."

Attention, the more modern and far more powerful approach, does something smarter: instead of a single running memory that can forget older details, it lets every word directly "look back" at every other word in the sentence simultaneously and decide how relevant each one is to understanding it`,
  },
];
