const EntityExtractor = require('./entityextractor');
const Summarizer = require('./summarizer');
const Search = require('./search');
const R = require('ramda');
const fs = require('fs');

class Lecture {

    constructor() {
      // this.id = id;
      this.document = [];
      this.entityExtractor = new EntityExtractor();
      this.entities = [];
      this.summarizer = new Summarizer();
      this.notes = [];
      this.professor;
    }

    addNotes (notes) {
        this.notes = notes;
    }

    getNotes() {
        return this.notes.join('\n\n');
    }

    addProfessor (professor) {
        this.professor = professor;
    }

    addBlock (text) {
        this.document.push(text);
    }

    getText () {
        return this.document;
    }

    getEntities() {
        return this.entities;
    }

    async generateTextWithEntities(block) {
        const result = await this.entityExtractor.getEntities(block).then((results) => {
            let textWithEntities = block;
            // var i = 0;
            R.forEach((entry) => {
                // i++;
                // console.log(entry);
                this.addEntity(entry);
                textWithEntities = textWithEntities.replace(new RegExp(entry[0], "i"), `<a href=${entry[1]}>${entry[0]}</a>`);
                // if (i == results.length) {
                //     return block;
                // }
            }, Object.entries(results));
            return textWithEntities;
        });
        return result;
    }

    addEntity(entity) {
      Search.getSnippet(entity[0]).then((result) => {
        this.entities.push({ name: entity[0], url: result[1], snippet: result[0]});
      })
    }

    close() {

      let lectureText = "";
      for (let i =0; i < this.document.length; i += 1) {
        lectureText += this.document[i] + " "
      }
      const notes = this.notes;
      const entities = this.entities;
      const a = this.summarizer.summarizeText(lectureText).then((result) => {
        console.log('HI')
        const stream = fs.createWriteStream('./digest.txt');
        // const result = lectureText;
        stream.once('open', function (fd) {
          stream.write("I. SUMMARY \n");
          stream.write("\n");
          stream.write(result + "\n");
          stream.write("\n");

          stream.write("II. NOTES \n");
          for (let i = 0; i < notes.length; i += 1) {
            stream.write("------------------------------------------------- \n");
            stream.write(notes[i] + "\n");
          }
          stream.write("------------------------------------------------- \n");
          stream.write("\n");

          stream.write("III. KEYWORDS \n")
          let entity;
          for (let i = 0; i < entities.length; i += 1) {
            entity = entities[i];
            stream.write(`${entity.name}: ${entity.snippet} \n`)
          }
          stream.end();
      })
    });
    }
}

    // validateID (num) {
    //   return num == this.id;
    // }

// const text = "Martin luther king was a great man and he was married to not rosa parks.";
// const l = new Lecture();
// l.generateTextWithEntities(text).then((result) => {
//     console.log(result);
// });

module.exports = Lecture;
// const l = new Lecture();
// l.document = ["Hello my name is Kian Hooshmand.", "I really like to say hello to people.", "Ajay is a great partner of mine.", "We are working super hard on this.",
//           "We are building the future of business and technology.", "Please like me."];
// l.notes = [ 'Pre Announcement\n---\n',
//   'Midterm Date: http://shoutkey.com/some\nTwo choices:\n\nA. Sunday March 19th: 4-6.\nB. April 5th - April 10th.\n\nFor reference: Spring break is March 27th - March 31st\n',
//   'http://shoutkey.com/but\nTo what degree do you believe the following statement: Nearly anybody enrolled at Berkeley could achieve an A in CS61B.\n---Assume they can spend the entire summer preparing beforehand, hire a tutor during the semester, etc.\n\n---Strongly disagree\n---Disagree\n---Neutral\n---Agree\n---Strongly agree\n',
//   'Growth vs. Fixed Mindset\nStudents can be thought of as having either a “growth” mindset or a “fixed” mindset (based on research by Carol Dweck).\n---“In a fixed mindset students believe their basic abilities, their intelligence, their talents, are just fixed traits. They have a certain amount and that\'s that, and then their goal becomes to look smart all the time and never look dumb.”\n------Perhaps most damningly, having to put in effort is a sign of weakness!\n---“In a growth mindset students understand that their talents and abilities can be developed through effort, good teaching and persistence. They don\'t necessarily think everyone\'s the same or anyone can be Einstein, but they believe everyone can get smarter if they work at it.”\nGrowing up and even through undergrad I was very much part of the “fixed mindset” camp.\n',
//   'A Brief Aside\nBloom’s Two Sigma Problem: In one experiment, student randomly picked for 1-on-1 teaching performed similarly to the top 2% of a simultaneous lecture course.\n',
//   'Announcements\nHW2 due next Wednesday.\n---Will be out late tonight.\n---Application of disjoint sets towards a cool physics problem.\n\nStill waiting on Midterm 2 date.\n\n\nRoundtable discussions next Thursday: (Link)\n\n',
//   'Announcements\nProject 2. Some lessons:\n---The database is a lie.\n---API design is hard. Your first design is probably going to be ugly.\n---Modular design is important.\n---Your choice of underlying data structures make a critical difference in how hard your code is to implement.\n---Inheritance and generics are not always the answer.\n---Tests are really useful help.\n---Working on a team has a complex human dimension and can be anywhere between infuriating and wonderful.\n\nFor more software engineering, see CS169. \n---Future HWs and project 3 will not feel quite like this one.\n',
//   'Announcements\nHow should you do well on midterm 2?\n---Go through the study guides soon after the relevant lecture.\n---Work on study guide problems independently, and discuss solutions with others.\n---Some problems require registration on Coursera (sorry).\n------Includes extra practice with various data structures topics, as well as a limitless pool of asymptotic runtime analysis problems.\n------Unfortunately, Coursera broke the exercises with a recent update, so these problems are on hold for now. Will let you know when they’re fixed.\n',
//   'CS61B\nLecture 21: Binary Search Trees\n---Binary Search Tree (intro)\n---BST Definitions\n---BST Operations\n---Performance\n',
//   'Analysis of an OLLMap<Character, ?>\nIn an earlier lecture, we implemented a map based on unordered arrays. For the order linked list map implementation below, name an operation that takes worst case linear time, i.e. Θ(N).\nsize\nget\ncontainsKey\nput\nclear\nFor space reasons, only keys are shown!\n---Values are not relevant to the discussion today.\n',
//   'Analysis of an OLLMap<Character, ?>\nIn an earlier lecture, we implemented a map based on unordered arrays. For the order linked list map implementation below, name an operation that takes worst case linear time, i.e. Θ(N).\nsize\nget\ncontainsKey\nput\nclear\nFor space reasons, only keys are shown!\n---Values are not relevant to the discussion today.\nsent\n7\nsize\n',
//   'Optimization: Extra Links\nFundamental Problem: Slow search, even though it’s in order.\nA\nC\nB\nD\nE\nF\nG\n---Add (random) express lanes. Skip List (won’t discuss in 61B)\n',
//   'Optimization: Change the Entry Point\nFundamental Problem: Slow search, even though it’s in order.\n---Move pointer to middle.\n\nA\nC\nB\nD\nE\nF\nG\n',
//   'Optimization: Change the Entry Point, Flip Links\nFundamental Problem: Slow search, even though it’s in order.\n---Move pointer to middle and flip left links. Halved search time!\n\nA\nC\nB\nD\nE\nF\nG\n',
//   'Optimization: Change the Entry Point, Flip Links\nFundamental Problem: Slow search, even though it’s in order.\n---How do we do even better?\n---Dream big!\n\nA\nC\nB\nD\nE\nF\nG\n',
//   'Optimization: Change Entry Point, Flip Links, Allow Big Jumps\nFundamental Problem: Slow search, even though it’s in order.\n---How do we do better?\n\nA\nC\nB\nD\nE\nF\nG\n',
//   'BST Definitions\n',
//   'Tree\nA tree consists of:\n---A set of nodes.\n---A set of edges that connect those nodes.\n------Constraint: There is exactly one path between any two nodes.\n\nGreen structures below are trees. Pink ones are not.\n',
//   'Rooted Trees and Rooted Binary Trees\nA\nIn a rooted tree, we call one node the root.\n---Every node N except the root has exactly one parent, defined as the first node on the path from N to the root.\n---Unlike (most) real trees, the root is usually depicted at the top of the tree.\n---A node with no child is called a leaf.\nIn a rooted binary tree, every node has either 0, 1, or 2 children (subtrees).\nFor each of these:\n---A is the root.\n---B is a child of A.     (and C of B) \n---A is a parent of B.    (and B of C)\n\nNot binary!\n',
//   'Binary Search Trees\nA binary search tree is a rooted binary tree with the BST property.\n\nBST Property. For every node X in the tree:\n---Every key in the left subtree is less than X’s key.\n---Every key in the right subtree is greater than X’s key.\u000b\ndog\nbag\nflat\nalf\ncat\nelf\nglut\ndebt\nbus\nears\naxe\ncow\nfish\ngut\n',
//   'Binary Search Trees\nOrdering must be complete, transitive, and antisymmetric. Given keys p and q:\n---Exactly one of p ≺ q and q ≺ p are true.\n---p ≺ q and q ≺ r imply p ≺ r.\n\nOne consequence of these rules: No duplicate keys allowed!\n---Keeps things simple. Most real world implementations follow this rule.\ndog\nbag\nflat\nalf\ncat\nelf\nglut\ndebt\nbus\nears\naxe\ncow\nfish\ngut\n',
//   'BST Operations\n',
//   'Finding a searchKey in a BST (come back to this for Lab8!)\nIf searchKey equals label, return.\n---If searchKey ≺ label, search left.\n---If searchKey ≻ label, search right. \ndog\nbag\nflat\nalf\ncat\nelf\nglut\n',
//   'Finding a searchKey in a BST\nIf searchKey equals label, return.\n---If searchKey ≺ label, search left.\n---If searchKey ≻ label, search right.  \ndog\nbag\nflat\nalf\ncat\nelf\nglut\nstatic BST find(BST T, Key sk) {\n   if (T == null)\n      return null;\n   if (sk.keyequals(T.label()))\n      return T;\n   else if (sk ≺ T.label())\n      return find(T.left, sk);\n   else\n      return find(T.right, sk);\n}\n\n',
//   'BST Search (Poll Everywhere!): N is the number of nodes (15)\nWhat is the runtime to complete a search on a “bushy” BST in the worst case?\n---Θ(log N)\n---Θ(N)\n---Θ(N log N)\n---Θ(N2)\n---Θ(2N)\n“bushiness” is an intuitive concept that we haven’t defined.\n',
//   'BST Search\nWhat is the runtime to complete a search on a “bushy” BST in the worst case?\n---Θ(log N)\n\u000bHeight of the tree is ~log2(N)\n',
//   'BSTs\nBushy BSTs are extremely fast.\n---At 1 microsecond per operation, can find something from a tree of size 10300000 in one second.\n\nMuch (perhaps most?) computation is dedicated towards finding things in response to queries.\n---It’s a good thing that we can do such queries almost for free.\n',
//   'Inserting a new key into a BST\nSearch for key.\n---If found, do nothing.\n---If not found:\n------Create new node.\n------Set appropriate link.\ndog\nbag\nflat\nalf\ncat\nelf\nglut\nExample: \ninsert “eyes”\neyes\n',
//   'Inserting a new key into a BST\nSearch for key.\n---If found, do nothing.\n---If not found:\n------Create new node.\n------Set appropriate link.\ndog\nbag\nflat\nalf\ncat\nelf\nglut\neyes\nA common rookie bad habit to avoid:\nstatic BST insert(BST T, Key ik) {\n  if (T == null)\n    return new BST(ik);\n  if (ik ≺ T.label()))\n    T.left = insert(T.left, ik);\n  else if (ik ≻ T.label())\n    T.right = insert(T.right, ik);\n  return T;\n}\n\n  if (T.left == null)\n    T.left = new BST(ik);\n  else if (T.right == null)\n    T.right = new BST(ik);\nezz\n',
//   'Deleting from a BST\n3 Cases:\n---Deletion key has no children.\n---Deletion key has one child.\n---Deletion key has two children.\ndog\nbag\nflat\nalf\ncat\nelf\nglut\neyes\n',
//   'Case 1: Deleting from a BST: Key with no Children\nDeletion key has no children (“glut”):\n---Just sever the parent’s link.\n---What happens to “glut” node?\ndog\nbag\nflat\nalf\ncat\nelf\neyes\nglut\n',
//   'Case 1: Deleting from a BST: Key with no Children\nDeletion key has no children (“glut”):\n---Just sever the parent’s link.\n---What happens to “glut” node?\n------Garbage collected.\ndog\nbag\nflat\nalf\ncat\nelf\neyes\nglut\n',
//   'Case 2: Deleting from a BST: Key with one Child\nExample: delete(“flat”):\n\n\nGoal:\n---Maintain BST property.\n---Flat’s child definitely larger than dog.\n------Safe to just move that child into flat’s spot.\n--\nThus: Move flat’s parent’s pointer to flat’s child.\ndog\nbag\nalf\ncat\nelf\neyes\nflat\n',
//   'Case 2: Deleting from a BST: Key with one Child\nExample: delete(“flat”):\n\n\nGoal:\n---Maintain BST property.\n---Flat’s child definitely larger than dog.\n------Safe to just move that child into flat’s spot.\n\nThus: Move flat’s parent’s pointer to flat’s child.\n---Flat will be garbage collected. \ndog\nbag\nalf\ncat\nelf\neyes\n',
//   'Hard Challenge\nDelete k.\ne\nb\ng\na\nd\nf\nv\np\ny\nm\nr\nx\nz\nk\n',
//   'Hard Challenge\nDelete k.\ne\nb\ng\na\nd\nf\nv\np\ny\nm\nr\nx\nz\nk\n',
//   'Case 3: Deleting from a BST: Deletion with two Children (Hibbard)\nExample: delete(“dog”)\n\n\nGoal:\n---Find a new root node.\n---Must be > than everything in left subtree.\n---Must be < than everything right subtree.\n\u000bWould bag work? \n\ndog\nbag\nflat\nalf\ncat\nelf\nglut\neyes\n',
//   'Example: delete(“dog”)\n\n\nGoal:\n---Find a new root node.\n---Must be > than everything in left subtree.\n---Must be < than everything right subtree.\n\u000bChoose either predecessor (“cat”) or successor (“elf”).\n---Delete “cat” or “elf”, and stick new copy in the root position:\n------This deletion guaranteed to be either case 1 or 2. Why?\n---This strategy is sometimes known as “Hibbard deletion”.\ndog\nbag\nflat\nalf\nglut\neyes\ncat\nelf\nCase 3: Deleting from a BST: Deletion with two Children (Hibbard)\n',
//   'Hard Challenge (Hopefully Now Easy)\nDelete k.\ne\nb\ng\na\nd\nf\nv\np\ny\nm\nr\nx\nz\nk\n',
//   'Hard Challenge (Hopefully Now Easy)\nDelete k. Two solutions: Either promote g or m to be in the root.\n---Below, solution for g is shown.\ne\nb\ng\na\nd\nf\nv\np\ny\nm\nr\nx\nz\nk\n',
//   'Hard Challenge (Hopefully Now Easy)\nTwo solutions: Either promote g or m to be in the root.\n---Below, solution for g is shown.\ne\nb\ng\na\nd\nf\nv\np\ny\nm\nr\nx\nz\n',
//   'BST Performance\n',
//   'Tree Height\nHeight varies dramatically between “bushy” and “spindly” trees.\nv\np\ny\nm\nr\nx\nz\nk\nv\ny\nz\nk\nH=3\nH=3\n',
//   'Tree Height: http://shoutkey.com/bleak\nHeight varies dramatically between “bushy” and “spindly” trees.\nv\np\ny\nm\nr\nx\nz\nk\nv\ny\nz\nk\nH=3\nH=3\nLet H(N) be the height of a tree with N nodes. Give H(N) in Big-Theta notation for “bushy” and “spindly” trees, respectively:\n---Θ(log(N)), \tΘ(log(N))\n---Θ(log(N)), \tΘ(N)\n---Θ(N), \t\tΘ(log(N))\n---Θ(N), \t\tΘ(N)\n',
//   'Tree Height\nHeight varies dramatically between “bushy” and “spindly” trees.\nv\np\ny\nm\nr\nx\nz\nk\nv\ny\nz\nk\nH = Θ(N) \nH=3\nH=3\nH = Θ(log(N)) \nPerformance of spindly trees can be just as bad as a linked list!\n---Example: containsKey(“z”) would take linear time.\n',
//   'BST Insertion Demo\n\n\n\n\n\n\n\n\n\n\n\nVideo courtesy of Kevin Wayne (Princeton University)\n\nNice Property. Random inserts take on average only Θ(log N) each. \n',
//   'BST: Mathematical Analysis\nComparison Counting. If N distinct keys are inserted into a BST, the expected average number of compares per insert is C(N) ~ 2 ln N = Θ(log N)\n---Will discuss this proof briefly towards the end of this course.\n\nTree Height. If N distinct keys are inserted in random order, expected tree height H(N) ~ 4.311 ln N (see Reed, 2003).\n\nRecall tilde notation from Asymptotics 3 lecture:\n---Similar to BigTheta, but don’t throw away the multiplicative constant.\n\nFormal definition: f(x) ~ g(x) means that \n',
//   'BST Deletion Demo\n\n\n\n\n\n\n\n\n\nSurprising Fact. Trees not balanced!  C(N) ~ sqrt(N) per operation.\nOpen Problem. Find a simple and efficient delete for BSTs. \nVideo courtesy of Kevin Wayne (Princeton University)\n\n',
//   'Summary\nBinary search trees: Efficient data structures for supporting insertion and search.\n---Operations on “Bushy” BSTs are logarithmic time.\n---Insertion of random data yields a bushy BST.\n------On random data, order of growth for get/put operations is logarithmic.\n\nPerformance issues:\n---“Spindly” trees have linear performance.\n---Hibbard deletion results in order of growth that is sqrt(N).\n------Nobody knows how to do better on simple BSTs.\n---\nLab this week: Implementing a BSTMap.\nNext time: Fixing these performance issues.\n\n',
//   'BST Implementation Tips \n',
//   'static BST insert(BST T, Key ik) {\n  if (T == null)\n    return new BST(ik);\n  if (ik ≺ T.label()))\n    T.left = insert(T.left, ik);\n  else if (ik ≻ T.label())\n    T.right = insert(T.right, ik);\n  return T;\n}\n\nTips for Lab8\n---Code from class was “naked recursion”. Your BSTMap will not be.\n---For each public method, e.g. put(K key, V value), create a private recursive method, e.g. put(K key, V value, Node n)\n---When inserting, always set left/right pointers, even if nothing is actually changing.\n---Avoid “arms length base cases”. Don’t check if left or right is null!\nAlways set, even if nothing changes!\nAvoid “arms length base cases”.\n  if (T.left == null)\n    T.left = new BST(ik);\n  else if (T.right == null)\n    T.right = new BST(ik);\n',
//   'Citations\nProbably photoshopped binary tree: http://cs.au.dk/~danvy/binaries.html\n\nDemo movies for binary search tree operations: Kevin Wayne (Princeton University)\n' ]
// l.close();
