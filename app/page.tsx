"use client";
import { useState, useEffect, useMemo } from "react";
import atm_abi from "../artifacts/contracts/BookStore.sol/BookStore.json";
import { ethers } from "ethers";

// Dummy book content - 10 different content pieces
const DUMMY_BOOK_CONTENT = [
  {
    title: "The Mysterious Journey",
    content: `# Chapter 1: The Beginning

In a land far beyond the mountains, where the sun kissed the horizon with golden hues, there lived a young explorer named Alex. Alex had always been fascinated by the unknown, spending countless hours reading about distant lands and hidden treasures.

One morning, as the first light of dawn broke through the clouds, Alex discovered an ancient map tucked away in an old library. The map was weathered and torn, but it showed a path to a legendary location that no one had dared to explore in centuries.

"This is it," Alex whispered, fingers tracing the faded lines. "This is my chance to make history."

## The Preparation

The journey would not be easy. Alex knew that preparation was key to survival. Gathering supplies became the first priority - food for weeks, water purification tablets, a sturdy tent, and most importantly, the will to succeed.

Friends tried to dissuade Alex from this dangerous quest. "You're risking everything for a legend," they said. But Alex was resolute. Some dreams are worth every risk.

And so, with a heart full of courage and a backpack full of essentials, Alex set forth on a journey that would change everything.`
  },
  {
    title: "Shadows of Tomorrow",
    content: `# Prologue: The Last City

The year was 2157, and humanity had retreated to the last remaining city on Earth. The world outside the massive walls was a wasteland, filled with remnants of a civilization that had pushed too far, too fast.

Sarah Chen was a data analyst working for the City Council, her job to monitor the signals from the outside world. Every day, she watched for signs of life, for hope that maybe, just maybe, there were others out there.

One Tuesday evening, as she was about to end her shift, a signal appeared on her screen. It was weak, but it was clear - someone was broadcasting from beyond the walls.

Her heart raced. This was unprecedented. For twenty years, no signals had been detected from the outside world. Could this be real? Could there actually be survivors?

## The Discovery

Sarah knew she had to investigate. She downloaded the signal data, her hands shaking with excitement and fear. What she found would challenge everything the city's leaders had told them about the outside world.

The signal contained coordinates, a location about 500 kilometers from the city walls. And a message, simple but clear: "We are here. We are waiting. We need you."

This was the moment Sarah had been waiting for her entire life. A chance to discover the truth. A chance to find hope in a world that had given up.`
  },
  {
    title: "The Artisan's Touch",
    content: `# Chapter 1: The Workshop

Master Craftsman Elena Martinez had spent four decades perfecting her art. Her workshop, tucked away in a quiet corner of the old town, was a sanctuary of creativity and tradition. Every tool had its place, every material its purpose.

Today was special. A client had commissioned a piece unlike any other - a music box that would play a melody composed by their late grandmother. It wasn't just a commission; it was a memory made tangible.

Elena began by selecting the wood. She ran her fingers across the grain, feeling its texture, its spirit. Maple, she decided. Its warmth and clarity would be perfect for this piece.

## The Process

Hour after hour, Elena worked with precision and patience. Each gear was hand-cut, each pin placed with care. The melody mechanism required the most attention - 27 pins, each one positioned to perfection.

As she worked, Elena thought about the stories that objects carry. This music box would outlive them all, carrying a melody across generations, connecting past and future through the simple act of winding a key.

The sun set and rose again before Elena was satisfied. She held the completed music box in her hands, winding it gently. The melody filled the workshop - sweet, nostalgic, perfect.

This was why she did what she did. Not just to create, but to preserve, to honor, to connect.`
  },
  {
    title: "Echoes of the Past",
    content: `# Part One: The Letter

Dr. James Thompson received the letter on a rainy Tuesday. It was addressed in handwriting he recognized immediately - his grandfather's. But that was impossible. His grandfather had passed away five years ago.

The letter was dated three months before his grandfather's death. It had been sitting in a safe deposit box, waiting for this exact moment. James opened it with trembling hands.

"My dear James," it began. "If you're reading this, you've reached the age I designated in my will. I have something important to tell you - something I couldn't tell you while I was alive."

## The Family Secret

The letter revealed a family history James had never known. His grandfather had been involved in an archaeological expedition in the 1960s, one that discovered something extraordinary - an ancient site that challenged everything historians knew about early human civilization.

But the discovery had been suppressed. Governments, organizations, powerful people - they all wanted the truth hidden. His grandfather had spent the rest of his life protecting the evidence, keeping it safe until the right person could continue the work.

That person, according to the letter, was James.

## The Inheritance

Along with the letter came a key. A key to a storage facility in another city. Inside, his grandfather had left everything - documents, photographs, coordinates, and the original artifacts.

James knew his life was about to change forever. He had a choice: walk away and live his comfortable life as a history professor, or follow in his grandfather's footsteps and uncover a truth that could rewrite history.

He chose truth.`
  },
  {
    title: "The Garden of Dreams",
    content: `# Introduction: Where Ideas Bloom

Maya Patel had always believed that gardens were magical places. Not because of any mystical properties, but because of what they represented - the endless possibility of growth, of transformation, of creating beauty from the simplest of seeds.

Her own garden, nestled in the backyard of her suburban home, had become a sanctuary. It was here that she found peace, clarity, and inspiration. It was here that she first had the idea that would change her life.

## The Vision

One spring morning, as Maya watched the first buds of her roses open to greet the sun, an idea bloomed in her mind. What if she could create a community garden? A place where people could come together, share knowledge, grow food, and build connections?

The idea took root and grew. Maya spent evenings sketching plans, researching permaculture principles, and imagining what such a space could become. It wouldn't just be a garden - it would be a community hub, a learning center, a place of healing.

## The Journey Begins

Convincing others wasn't easy. The city council needed persuading. Neighbors needed assurance that this wouldn't become an eyesore. Sponsors needed to see the value. But Maya was persistent.

She organized meetings, created presentations, rallied volunteers. Slowly, what started as a dream began to take shape. Permits were approved. Land was donated. Volunteers came forward with tools, seeds, and enthusiasm.

The groundbreaking ceremony was a beautiful day in early summer. As Maya pushed the first shovel into the earth, she knew this was just the beginning. This garden would grow, and with it, so would the community.`
  },
  {
    title: "Code of Honor",
    content: `# Level 1: Initiation

In the neon-lit streets of Neo-Tokyo, 2089, hackers ruled the digital underworld. Among them, a legend was being born. Her name was Keiko, and at 19, she was already one of the most skilled coders in the city.

But skills alone weren't enough. The Hackers' Guild, an elite organization that controlled the most valuable data in the world, required more than technical prowess. They required honor, loyalty, and the willingness to use one's abilities for the greater good.

Keiko's initiation test was about to begin. She sat in her dimly lit apartment, her hands hovering over the holographic keyboard, ready to breach the Guild's first security layer.

## The Challenge

The test was simple in concept, complex in execution. Break through five layers of security, each more sophisticated than the last, and retrieve a specific piece of data. But there was a catch - she had to do it without triggering any alarms, without leaving a trace, and within three hours.

Failure meant banishment from the Guild forever. Success meant becoming part of an organization that could change the world.

Keiko took a deep breath and began. Her fingers danced across the keyboard, lines of code appearing in the air before her. The first layer fell in minutes. The second took longer. The third required all her ingenuity.

By the fourth layer, sweat beaded on her forehead. This was getting difficult. But she pushed forward, drawing on every trick she'd learned, every technique she'd mastered.

## The Final Layer

The fifth layer was unlike anything she'd encountered. It wasn't just code - it was a puzzle, a test of creativity and unconventional thinking. For an hour, she tried traditional approaches, and each time, she was blocked.

Then, inspiration struck. What if the solution wasn't to break through, but to work with the system? To become part of it, rather than fight against it?

She rewrote her approach entirely. Instead of forcing entry, she requested permission. Instead of breaking rules, she followed them - just in a way the system's creators never anticipated.

The final layer opened like a flower. Keiko had passed. She was in.`
  },
  {
    title: "The Lighthouse Keeper",
    content: `# First Watch: The Storm Approaches

Captain Marcus stood at the helm of his lighthouse, watching the storm clouds gather on the horizon. After thirty years of service, he knew storms. He knew their patterns, their moods, their dangers.

This one was different. This storm carried something with it - a ship, lost and struggling against the waves. Marcus could see it through his telescope, a small vessel being tossed like a toy in the angry ocean.

His duty was clear. The lighthouse beam would guide them, but in conditions like this, they might need more. They might need a rescue.

## The Decision

Marcus radioed the coast guard, but help was an hour away. The ship wouldn't last that long. He had a choice: stay safely in his lighthouse and do his duty, or risk everything to attempt a rescue in the storm.

He chose to act.

Grabbing his emergency kit and life jacket, Marcus made his way to the small rescue boat tied at the base of the lighthouse. The waves were massive, each one threatening to capsize the tiny vessel. But Marcus had navigated these waters for decades. He knew every current, every hidden rock, every safe passage.

## The Rescue

Reaching the ship was a battle itself. Wave after wave crashed over his boat, soaking him to the bone, trying to drag him under. But he persisted, fighting against nature itself.

When he finally reached the ship, he found three people - a family, huddled together, terrified but alive. Getting them aboard his boat was another challenge, but with steady hands and calm instructions, he managed it.

The journey back was the most dangerous part. With four people now in the boat, every wave was a threat. But Marcus guided them through, using the lighthouse beam as his North Star, his beacon of hope.

They made it to shore just as the coast guard arrived. The family was safe. Marcus had done his duty, and more. That night, as the storm passed and the stars emerged, he stood in his lighthouse, knowing that for three people, he had been the difference between life and death.`
  },
  {
    title: "The Time Weaver",
    content: `# Thread One: The Discovery

Aria found the loom in her grandmother's attic, covered in dust and cobwebs. It was old, impossibly old, yet it felt alive in a way that defied explanation. When she touched it, images flooded her mind - moments from the past, glimpses of the future.

She didn't understand what she was experiencing, but she knew it was important. Her grandmother had mentioned the loom in her will, had left instructions: "When the time is right, you will know what to do."

## Understanding the Gift

Research led Aria to ancient texts about Time Weavers - people with the ability to see and manipulate the threads of time. Each thread represented a choice, a possibility, a path that could be taken or avoided.

But with this power came responsibility. Changing time, even slightly, could have catastrophic consequences. A single thread pulled in the wrong direction could unravel the entire tapestry of existence.

## The First Weave

Aria's first attempt was small - she went back to prevent a minor accident. A child would have fallen from a tree, breaking an arm. Aria saw this in the threads and wove a different pattern, creating a timeline where the child was called away before climbing.

The change was subtle, barely noticeable. But it worked. The child was safe, and the timeline adjusted around this small alteration.

But Aria soon discovered the price. Every change required something in return. Energy, memories, pieces of herself. The more she wove, the more she unraveled.`

  },
  {
    title: "The Last Library",
    content: `# Volume 1: The Arrival

In a world where physical books had become relics, the Last Library stood as a monument to a forgotten age. It was here that Noah had been sent, his punishment for questioning the digital-only policy of the New World Order.

As he pushed open the massive oak doors for the first time, he was struck by the smell - old paper, leather bindings, dust and wisdom accumulated over centuries. Shelves stretched to a ceiling he couldn't see, filled with volumes that contained the thoughts, dreams, and knowledge of countless generations.

## The Discovery

His job was simple: catalog and prepare the books for digitization. The government wanted to preserve them, then destroy the originals to make room for more efficient data storage centers.

But as Noah began reading, he discovered something extraordinary. These weren't just books - they were time capsules. Each volume contained not just words, but the essence of its era, the thoughts of people long gone, perspectives that digital media couldn't capture.

## The Choice

Noah realized he had a choice. He could follow orders, help digitize and destroy these irreplaceable treasures. Or he could find a way to save them, to protect this last bastion of physical knowledge in a digital world.

He chose to save them.

Working in secret, Noah began smuggling books out of the library, finding safe houses for them, building a network of people who still valued the written word in its original form.

The Last Library wouldn't be the last after all. It would be the first of many, the seed from which a new appreciation for physical books would grow.`
  },
  {
    title: "The Quantum Baker",
    content: `# Recipe 1: The Perfect Loaf

Professor Chen had spent her career studying quantum mechanics, but it was in her kitchen that she made her greatest discovery. One evening, as she was baking bread for her dinner party, she accidentally applied quantum principles to the recipe.

The result was extraordinary. The bread wasn't just delicious - it had properties that defied explanation. A single slice could feed ten people. The flavor changed based on what the eater needed most - sweet for the stressed, savory for the hungry, comforting for the lonely.

## The Experiment

Chen began experimenting. Each recipe became a quantum equation, each ingredient a variable in a complex formula. Her cookies could heal minor ailments. Her cakes could bring clarity of thought. Her bread could nourish body and soul simultaneously.

Word spread quickly. People came from miles around, seeking her quantum-baked goods. But with attention came scrutiny. Government agencies wanted to weaponize her recipes. Corporations wanted to mass-produce them. Scientists wanted to understand the impossible.

## The Philosophy

But Chen refused all offers. She wasn't a weapon maker or a business mogul. She was a baker. Her gift wasn't about power or profit - it was about understanding the fundamental connection between energy, matter, and intention.

Each day, she opened her small bakery, greeting customers with a smile and serving them food that would change their day, if not their lives. That was enough. In a world obsessed with more, she had found contentment in the simple act of baking with love, care, and just a touch of quantum physics.

The secret, she knew, wasn't in the ingredients or the techniques. It was in the understanding that everything is connected, that intention matters, and that sometimes, the most profound discoveries come not from laboratories, but from kitchens.`
  }
];

// Function to get content for a book based on its ID (consistent assignment)
const getBookContent = (bookId: number) => {
  // Use modulo to consistently assign content based on book ID
  const contentIndex = (bookId - 1) % DUMMY_BOOK_CONTENT.length;
  return DUMMY_BOOK_CONTENT[contentIndex];
};

// Toast notification component
const Toast = ({ message, type, onClose }: { message: string; type: 'success' | 'error' | 'info'; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
  const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
  
  return (
    <div className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-lg fixed top-4 right-4 z-50 flex items-center gap-3 animate-slide-in max-w-md`}>
      <span className="text-xl">{icon}</span>
      <span className="flex-1">{message}</span>
      <button onClick={onClose} className="text-white hover:text-gray-200 text-xl font-bold">×</button>
    </div>
  );
};

const usePurchase = (contract: any, showToast: (msg: string, type: 'success' | 'error' | 'info') => void) => {
  const [isLoading, setIsLoading] = useState(false);

  async function purchaseBook(bookId: any, quantity: any) {
    try {
      setIsLoading(true);
      if (!contract) {
        showToast("Please connect to MetaMask first", 'error');
        setIsLoading(false);
        return { success: false };
      }

      // Request account access if needed
      // @ts-ignore
      if (window.ethereum) {
        // @ts-ignore
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      }
      
      showToast("Processing purchase...", 'info');
      
      // Get book details to calculate total price
      const book = await contract.getBook(bookId);
      const bookPrice = book[3]; // price is at index 3
      const totalPrice = bookPrice.mul(quantity); // price * quantity
      
      const transaction = await contract.purchaseBook(bookId, quantity, {
        value: totalPrice,
      });

      await transaction.wait();
      showToast(`Successfully purchased ${quantity} book(s)!`, 'success');
      setIsLoading(false);
      return { success: true };
    } catch (error: any) {
      setIsLoading(false);
      let errorMessage = "Failed to purchase book. ";
      if (error.message?.includes("Insufficient funds")) {
        errorMessage = "Insufficient funds. Please send enough ETH.";
      } else if (error.message?.includes("Insufficient stock")) {
        errorMessage = "Insufficient stock. Not enough books available.";
      } else if (error.message?.includes("user rejected") || error.message?.includes("User rejected")) {
        errorMessage = "Transaction cancelled.";
        return { success: false };
      } else if (error.message?.includes("Invalid book ID")) {
        errorMessage = "Invalid book ID. Please check and try again.";
      } else if (error.message) {
        errorMessage += error.message;
      }
      showToast(errorMessage, 'error');
      return { success: false };
    }
  }

  return { purchaseBook, isLoading };
};

const useAddBook = (contract: any, showToast: (msg: string, type: 'success' | 'error' | 'info') => void) => {
  const [isLoading, setIsLoading] = useState(false);

  const addBook = async (title: any, author: any, price: any, stock: any, imageUrl: any = "", genre: any = "") => {
    try {
      setIsLoading(true);
      if (!title || !author || !price || !stock) {
        showToast("Please fill in all required fields", 'error');
      setIsLoading(false);
        return;
      }

      if (!contract) {
        showToast("Please connect to MetaMask first", 'error');
      setIsLoading(false);
        return { success: false };
      }
      
      // Verify provider connection
      // @ts-ignore
      if (!window.ethereum) {
        showToast("MetaMask is not installed. Please install MetaMask to use this app.", 'error');
        setIsLoading(false);
        return { success: false };
      }
      
      // Request account access if needed
      // @ts-ignore
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // Use placeholder image if no URL provided
      const finalImageUrl = imageUrl || "https://via.placeholder.com/300x400/4A90E2/FFFFFF?text=" + encodeURIComponent(title);
      
      showToast("Adding book...", 'info');
      const priceInWei = ethers.utils.parseEther(price.toString());
      const stockNumber = parseInt(stock);
      
      const transaction = await contract.addBook(title, author, priceInWei, stockNumber, finalImageUrl, genre || "General");
      await transaction.wait();
      
      showToast(`Book "${title}" added successfully!`, 'success');
      setIsLoading(false);
      return { success: true };
    } catch (error: any) {
      let errorMessage = "Failed to add book. ";
      if (error.message && error.message.includes("Only Account #2")) {
        errorMessage = "Only Account #2 can add books. Switch accounts in MetaMask.";
      } else if (error.message && error.message.includes("user rejected")) {
        errorMessage = "Transaction cancelled.";
      } else if (error.message && (error.message.includes("RPC") || error.message.includes("too many errors") || error.message.includes("network") || error.message.includes("ECONNREFUSED"))) {
        errorMessage = "Cannot connect to Hardhat node. Make sure 'npx hardhat node' is running on port 8545.";
      } else if (error.message) {
        errorMessage += error.message;
      }
      showToast(errorMessage, 'error');
      setIsLoading(false);
      return { success: false };
    }
  };

  return { addBook, isLoading };
};

const useGetAllBooks = (contract: any) => {
  const [allBooks, setAllBooks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [storeOwner, setStoreOwner] = useState<string>("");

  const fetchAllBooks = async () => {
    if (!contract) return;
    
    try {
      setIsLoading(true);
      const bookIdCounter = await contract.bookIdCounter();
      const owner = await contract.owner();
      setStoreOwner(owner);
      
      const books: any[] = [];
      const addedBookIds = new Set<number>();
      
      for (let i = 1; i <= bookIdCounter.toNumber(); i++) {
        try {
          if (addedBookIds.has(i)) continue;
          
          const book = await contract.getBook(i);
          const bookId = book[0].toNumber();
          addedBookIds.add(bookId);
          
          let latestBuyer: string | null = null;
          let ownerDisplay = "Not purchased";
          
          try {
            latestBuyer = await contract.getLatestBuyer(i);
            ownerDisplay = latestBuyer as string;
          } catch (error: any) {
            if (error.message && !error.message.includes("No purchases")) {
              console.error(`Error getting latest buyer for book ${i}:`, error.message);
            }
          }
          
          books.push({
            id: bookId,
        title: book[1],
        author: book[2],
        price: ethers.utils.formatEther(book[3]),
            stock: book[4].toNumber(),
            available: book[4].toNumber() > 0,
            latestBuyer: latestBuyer || "",
            ownerDisplay: ownerDisplay,
            imageUrl: book[5] || "",
            genre: book[6] || "General"
          });
        } catch (error) {
          // Skip invalid book IDs
        }
      }
      
      books.sort((a, b) => a.id - b.id);
      setAllBooks(books);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching all books:", error);
      setIsLoading(false);
    }
  };

  return { allBooks, isLoading, fetchAllBooks, storeOwner };
};

const useMyPurchases = (contract: any, currentAccount: string | null) => {
  const [myBooks, setMyBooks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMyPurchases = async () => {
    if (!contract || !currentAccount) {
      setMyBooks([]);
      return;
    }
    
    try {
      setIsLoading(true);
      const bookIdCounter = await contract.bookIdCounter();
      const books: any[] = [];
      
      for (let i = 1; i <= bookIdCounter.toNumber(); i++) {
        try {
          const book = await contract.getBook(i);
          
          // First check current ownership - this is the source of truth
          let currentOwnership = 0;
          try {
            const owned = await contract.getOwnedQuantity(i, currentAccount);
            currentOwnership = owned.toNumber();
    } catch (error) {
            // If function fails, skip this book
            continue;
          }
          
          // Only show books that the user currently owns
          if (currentOwnership > 0) {
            // Get purchase history for price tracking
            let totalQuantity = 0;
            try {
              const purchases = await contract.getBookPurchases(i);
              for (let j = 0; j < purchases.length; j++) {
                if (purchases[j].buyer.toLowerCase() === currentAccount.toLowerCase()) {
                  totalQuantity += purchases[j].quantity.toNumber();
                }
              }
            } catch (error) {
              // If we can't get purchase history, that's okay - we'll use ownership
            }
              let listingPrice = null;
              let listingQuantity = 0;
              let isListed = false;
              try {
                const listing = await contract.getListing(i, currentAccount);
                isListed = listing[2];
                if (isListed) {
                  listingPrice = ethers.utils.formatEther(listing[0]);
                  listingQuantity = listing[1].toNumber();
                }
              } catch (error) {
                isListed = false;
              }
              
              // Get the actual purchase price (what user paid per unit)
              let actualPurchasePrice = book[3]; // Default to original price
              try {
                const purchasePrice = await contract.latestPurchasePrice(i, currentAccount);
                if (purchasePrice.gt(0)) {
                  actualPurchasePrice = purchasePrice;
                }
              } catch (error) {
                // If function fails, use original price
                actualPurchasePrice = book[3];
              }
              
              books.push({
                id: book[0].toNumber(),
                title: book[1],
                author: book[2],
                price: ethers.utils.formatEther(actualPurchasePrice), // Use actual purchase price
                stock: book[4].toNumber(),
                purchasedQuantity: currentOwnership, // Use current ownership
                available: book[4].toNumber() > 0,
                isListed: isListed,
                listingPrice: listingPrice,
                listingQuantity: listingQuantity,
                imageUrl: book[5] || ""
              });
            }
        } catch (error) {
          // Skip invalid book IDs
        }
      }
      
      setMyBooks(books);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching my purchases:", error);
      setIsLoading(false);
    }
  };

  return { myBooks, isLoading, fetchMyPurchases };
};

const useListForSale = (contract: any, showToast: (msg: string, type: 'success' | 'error' | 'info') => void) => {
  const [isLoading, setIsLoading] = useState(false);

  const listForSale = async (bookId: any, price: any, quantity: any) => {
    try {
      setIsLoading(true);
      const priceStr = price.toString().trim();
      const priceInWei = ethers.utils.parseEther(priceStr);
      
      showToast("Listing book for sale...", 'info');
      const transaction = await contract.listForSale(bookId, priceInWei, quantity);
      await transaction.wait();
      
      showToast(`Book listed successfully at ${priceStr} ETH!`, 'success');
      setIsLoading(false);
      return { success: true };
    } catch (error: any) {
      let errorMessage = "Failed to list book. ";
      if (error.message && error.message.includes("don't own")) {
        errorMessage = "You don't own enough copies of this book.";
      } else if (error.message && error.message.includes("already have")) {
        errorMessage = "You already have an active listing. Cancel it first.";
      } else if (error.message && error.message.includes("user rejected")) {
        errorMessage = "Transaction cancelled.";
      } else if (error.message) {
        errorMessage += error.message;
      }
      showToast(errorMessage, 'error');
      setIsLoading(false);
      return { success: false };
    }
  };

  const cancelListing = async (bookId: any) => {
    try {
      setIsLoading(true);
      showToast("Cancelling listing...", 'info');
      const transaction = await contract.cancelListing(bookId);
      await transaction.wait();
      showToast("Listing cancelled successfully!", 'success');
      setIsLoading(false);
      return { success: true };
    } catch (error: any) {
      let errorMessage = "Failed to cancel listing. ";
      if (error.message && error.message.includes("user rejected")) {
        errorMessage = "Transaction cancelled.";
      } else if (error.message) {
        errorMessage += error.message;
      }
      showToast(errorMessage, 'error');
      setIsLoading(false);
      return { success: false };
    }
  };

  return { listForSale, cancelListing, isLoading };
};

const usePurchaseFromUser = (contract: any, showToast: (msg: string, type: 'success' | 'error' | 'info') => void) => {
  const [isLoading, setIsLoading] = useState(false);

  const purchaseFromUser = async (bookId: any, seller: any, quantity: any) => {
    try {
      setIsLoading(true);
      showToast("Processing purchase...", 'info');
      
      // Fetch the listing to get the current price
      const listing = await contract.getListing(bookId, seller);
      const listingPrice = listing[0]; // Price per unit in wei (already a BigNumber)
      const listingQuantity = listing[1]; // Available quantity
      const isActive = listing[2]; // Active status
      
      // Validate listing is active
      if (!isActive) {
        throw new Error("Listing is not active");
      }
      
      // Validate quantity
      if (quantity > listingQuantity.toNumber()) {
        throw new Error("Insufficient quantity in listing");
      }
      
      // Calculate total price: listing price * quantity
      const totalPrice = listingPrice.mul(ethers.BigNumber.from(quantity));
      
      console.log("Purchase details:", {
        bookId,
        seller,
        quantity,
        listingPrice: ethers.utils.formatEther(listingPrice),
        totalPrice: ethers.utils.formatEther(totalPrice)
      });
      
      const transaction = await contract.purchaseFromUser(bookId, seller, quantity, { value: totalPrice });
      await transaction.wait();
      
      showToast(`Successfully purchased ${quantity} book(s) from seller!`, 'success');
      setIsLoading(false);
      return { success: true };
    } catch (error: any) {
      let errorMessage = "Failed to purchase from user. ";
      if (error.message && error.message.includes("cannot buy")) {
        errorMessage = "You cannot buy from yourself.";
      } else if (error.message && error.message.includes("not active")) {
        errorMessage = "Listing is no longer active.";
      } else if (error.message && error.message.includes("Insufficient")) {
        errorMessage = "Insufficient funds or quantity.";
      } else if (error.message && error.message.includes("user rejected")) {
        errorMessage = "Transaction cancelled.";
      } else if (error.message) {
        errorMessage += error.message;
      }
      showToast(errorMessage, 'error');
      setIsLoading(false);
      return { success: false };
    }
  };

  return { purchaseFromUser, isLoading };
};

const useWhitelist = (contract: any, currentAccount: string | null, showToast: (msg: string, type: 'success' | 'error' | 'info') => void) => {
  const [isLoading, setIsLoading] = useState(false);

  const addToWhitelist = async (bookId: any) => {
    try {
      setIsLoading(true);
      if (!contract || !currentAccount) {
        showToast("Please connect to MetaMask first", 'error');
        setIsLoading(false);
        return { success: false };
      }

      showToast("Adding to favorites...", 'info');
      const transaction = await contract.addToWhitelist(bookId);
      await transaction.wait();
      showToast("Book added to favorites!", 'success');
      setIsLoading(false);
      return { success: true };
    } catch (error: any) {
      let errorMessage = "Failed to add to favorites. ";
      if (error.message && error.message.includes("already in whitelist")) {
        errorMessage = "Book is already in your favorites.";
      } else if (error.message && error.message.includes("user rejected")) {
        errorMessage = "Transaction cancelled.";
        setIsLoading(false);
        return { success: false };
      } else if (error.message) {
        errorMessage += error.message;
      }
      showToast(errorMessage, 'error');
      setIsLoading(false);
      return { success: false };
    }
  };

  const removeFromWhitelist = async (bookId: any) => {
    try {
      setIsLoading(true);
      if (!contract || !currentAccount) {
        showToast("Please connect to MetaMask first", 'error');
        setIsLoading(false);
        return { success: false };
      }

      showToast("Removing from favorites...", 'info');
      const transaction = await contract.removeFromWhitelist(bookId);
      await transaction.wait();
      showToast("Book removed from favorites!", 'success');
      setIsLoading(false);
      return { success: true };
    } catch (error: any) {
      let errorMessage = "Failed to remove from favorites. ";
      if (error.message && error.message.includes("not in whitelist")) {
        errorMessage = "Book is not in your favorites.";
      } else if (error.message && error.message.includes("user rejected")) {
        errorMessage = "Transaction cancelled.";
        setIsLoading(false);
        return { success: false };
      } else if (error.message) {
        errorMessage += error.message;
      }
      showToast(errorMessage, 'error');
      setIsLoading(false);
      return { success: false };
    }
  };

  const checkWhitelisted = async (bookId: any): Promise<boolean> => {
    try {
      if (!contract || !currentAccount) return false;
      const isWhitelisted = await contract.isWhitelisted(bookId, currentAccount);
      return isWhitelisted;
    } catch (error) {
      console.error("Error checking whitelist status:", error);
      return false;
    }
  };

  return { addToWhitelist, removeFromWhitelist, checkWhitelisted, isLoading };
};

const useGetWhitelist = (contract: any, currentAccount: string | null) => {
  const [whitelistedBooks, setWhitelistedBooks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWhitelist = async () => {
    if (!contract || !currentAccount) {
      setWhitelistedBooks([]);
      return;
    }

    try {
      setIsLoading(true);
      const bookIds = await contract.getWhitelistedBooks(currentAccount);
      const books: any[] = [];

      for (let i = 0; i < bookIds.length; i++) {
        try {
          const bookId = bookIds[i].toNumber();
          const book = await contract.getBook(bookId);
          const isWhitelisted = await contract.isWhitelisted(bookId, currentAccount);
          
          if (isWhitelisted) {
            books.push({
              id: bookId,
        title: book[1],
        author: book[2],
        price: ethers.utils.formatEther(book[3]),
              stock: book[4].toNumber(),
              imageUrl: book[5] || "",
              genre: book[6] || ""
            });
          }
    } catch (error) {
          // Skip invalid books
          console.error(`Error fetching book ${bookIds[i]}:`, error);
        }
      }

      setWhitelistedBooks(books);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching whitelist:", error);
      setIsLoading(false);
    }
  };

  return { whitelistedBooks, isLoading, fetchWhitelist };
};

export default function Home() {
  const contractAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";
  const contractABI = atm_abi.abi;

  const [contract, setContract] = useState<any>(null);
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type });
  };

  const connectToContract = async () => {
    try {
      // @ts-ignore
      if (typeof window.ethereum === 'undefined') {
        showToast("Please install MetaMask to use this app", 'error');
        return;
      }

      // @ts-ignore
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setCurrentAccount(accounts[0]);

      // @ts-ignore
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      setContract(contract);
      
      // @ts-ignore
      window.ethereum.on('accountsChanged', (newAccounts: string[]) => {
        setCurrentAccount(newAccounts[0] || null);
        if (!newAccounts[0]) {
          setContract(null);
        }
      });
      
      showToast("Connected to Book Store successfully!", 'success');
    } catch (error) {
      showToast("Failed to connect. Please check MetaMask and try again.", 'error');
    }
  };

  const { purchaseBook, isLoading: isPurchasing } = usePurchase(contract, showToast);
  const { addBook, isLoading } = useAddBook(contract, showToast);
  const { allBooks, isLoading: isLoadingAllBooks, fetchAllBooks, storeOwner } = useGetAllBooks(contract);
  const { myBooks, isLoading: isLoadingMyPurchases, fetchMyPurchases } = useMyPurchases(contract, currentAccount);
  const { listForSale, cancelListing, isLoading: isListing } = useListForSale(contract, showToast);
  const { purchaseFromUser, isLoading: isPurchasingFromUser } = usePurchaseFromUser(contract, showToast);
  const { addToWhitelist, removeFromWhitelist, checkWhitelisted, isLoading: isWhitelisting } = useWhitelist(contract, currentAccount, showToast);
  const { whitelistedBooks, isLoading: isLoadingWhitelist, fetchWhitelist } = useGetWhitelist(contract, currentAccount);
  
  // Default to 'allBooks' for regular users, 'operations' for book manager
  const [activeTab, setActiveTab] = useState<'operations' | 'allBooks' | 'myPurchases' | 'marketplace' | 'profile' | 'whitelist'>('allBooks');
  const [marketplaceListings, setMarketplaceListings] = useState<any[]>([]);
  const [isLoadingMarketplace, setIsLoadingMarketplace] = useState(false);
  
  // Search state for All Books
  const [searchGenre, setSearchGenre] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  
  // Search state for Marketplace
  const [searchGenreMarketplace, setSearchGenreMarketplace] = useState<string>("");
  const [searchTextMarketplace, setSearchTextMarketplace] = useState<string>("");
  const [minPriceMarketplace, setMinPriceMarketplace] = useState<string>("");
  const [maxPriceMarketplace, setMaxPriceMarketplace] = useState<string>("");
  
  // Whitelist state - track which books are whitelisted
  const [whitelistedBookIds, setWhitelistedBookIds] = useState<Set<number>>(new Set());
  
  const fetchMarketplaceListings = async () => {
    if (!contract) return;
    
    try {
      setIsLoadingMarketplace(true);
      const bookIdCounter = await contract.bookIdCounter();
      const listings: any[] = [];
      
      for (let i = 1; i <= bookIdCounter.toNumber(); i++) {
        try {
          const activeSellers = await contract.getActiveListings(i);
          const book = await contract.getBook(i);
          
          for (let j = 0; j < activeSellers.length; j++) {
            const seller = activeSellers[j];
            const listingData = await contract.getListing(i, seller);
            
            // Check if listing is active AND has quantity > 0
            const isActive = listingData[2];
            const quantity = listingData[1];
            
            if (isActive && quantity.gt(0)) {
              // Also verify the seller still owns enough books
              try {
                const owned = await contract.getOwnedQuantity(i, seller);
                if (owned.gte(quantity)) {
                  listings.push({
                    bookId: i,
                    seller: seller,
                    price: ethers.utils.formatEther(listingData[0]),
                    quantity: quantity.toNumber(),
                    title: book[1],
                    author: book[2],
                    active: isActive,
                    imageUrl: book[5] || "",
                    genre: book[6] || ""
                  });
                } else {
                  console.warn(`Listing for book ${i} by ${seller} has quantity ${quantity.toString()} but seller only owns ${owned.toString()}`);
                }
              } catch (error) {
                // If we can't verify ownership, still show the listing (contract will handle validation)
                listings.push({
                  bookId: i,
                  seller: seller,
                  price: ethers.utils.formatEther(listingData[0]),
                  genre: book[6] || "",
                  quantity: quantity.toNumber(),
                  title: book[1],
                  author: book[2],
                  active: isActive,
                  imageUrl: book[5] || ""
                });
              }
            }
          }
        } catch (error) {
          // Skip invalid books
        }
      }
      
      setMarketplaceListings(listings);
      setIsLoadingMarketplace(false);
    } catch (error) {
      console.error("Error fetching marketplace listings:", error);
      setIsLoadingMarketplace(false);
    }
  };
  
  const BOOK_MANAGER_ADDRESS = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"; // Account #2
  const isBookManager = currentAccount?.toLowerCase() === BOOK_MANAGER_ADDRESS.toLowerCase();
  
  useEffect(() => {
    // Redirect non-manager accounts away from Operations tab
    if (currentAccount && !isBookManager && activeTab === 'operations') {
      setActiveTab('allBooks');
    }
    
    if (currentAccount && activeTab === 'myPurchases') {
      fetchMyPurchases();
    }
    if (currentAccount && activeTab === 'profile') {
      fetchMyPurchases();
      fetchSalesHistory();
      if (isBookManager) {
        fetchTotalBooksCount();
        fetchAllBooks();
      }
    }
    if (activeTab === 'marketplace') {
      fetchMarketplaceListings();
    }
    if (currentAccount && activeTab === 'whitelist') {
      fetchWhitelist();
    }
    // Refresh whitelist status for all books when account changes
    if (currentAccount && contract) {
      refreshWhitelistStatus();
    }
  }, [currentAccount, activeTab, isBookManager]);

  // Refresh whitelist status for all books
  const refreshWhitelistStatus = async () => {
    if (!contract || !currentAccount || allBooks.length === 0) return;
    try {
      const newWhitelistedIds = new Set<number>();
      for (const book of allBooks) {
        const isWhitelisted = await checkWhitelisted(book.id);
        if (isWhitelisted) {
          newWhitelistedIds.add(book.id);
        }
      }
      setWhitelistedBookIds(newWhitelistedIds);
    } catch (error) {
      console.error("Error refreshing whitelist status:", error);
    }
  };

  // Purchase modal state
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [purchaseQuantity, setPurchaseQuantity] = useState("1");
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  
  // Book viewer state
  const [isBookViewerOpen, setIsBookViewerOpen] = useState(false);
  const [viewingBook, setViewingBook] = useState<any>(null);
  
  // Sales history state
  const [salesHistory, setSalesHistory] = useState<any[]>([]);
  const [isLoadingSales, setIsLoadingSales] = useState(false);
  const [totalProfit, setTotalProfit] = useState<string>("0");
  
  // Admin dashboard state
  const [totalBooksCount, setTotalBooksCount] = useState<number>(0);
  const [isLoadingBooksCount, setIsLoadingBooksCount] = useState(false);
  const [editingBook, setEditingBook] = useState<any>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<any>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdatingBook, setIsUpdatingBook] = useState(false);
  const [isDeletingBook, setIsDeletingBook] = useState(false);
  
  // Update book form state
  const [updateFormData, setUpdateFormData] = useState({
    title: "",
    author: "",
    price: "",
    stock: "",
    imageUrl: "",
    genre: ""
  });
  
  // Fetch sales history
  const fetchSalesHistory = async () => {
    if (!contract || !currentAccount) {
      setSalesHistory([]);
      setTotalProfit("0");
      return;
    }
    
    try {
      setIsLoadingSales(true);
      console.log("Fetching sales history for:", currentAccount);
      
      // Check if the contract has the getSalesHistory function
      if (!contract.getSalesHistory) {
        console.error("Contract does not have getSalesHistory function. Please redeploy the contract.");
        showToast("Contract needs to be redeployed. Please contact the administrator.", 'error');
        setIsLoadingSales(false);
        return;
      }
      
      const sales = await contract.getSalesHistory(currentAccount);
      console.log("Sales fetched:", sales);
      console.log("Number of sales:", sales?.length || 0);
      
      const totalProfitWei = await contract.getTotalProfit(currentAccount);
      console.log("Total profit (wei):", totalProfitWei.toString());
      console.log("Total profit (ETH):", ethers.utils.formatEther(totalProfitWei));
      
      if (!sales || sales.length === 0) {
        console.log("No sales found for account:", currentAccount);
        console.log("Is Book Manager?", currentAccount?.toLowerCase() === BOOK_MANAGER_ADDRESS.toLowerCase());
        setSalesHistory([]);
        setTotalProfit("0");
        setIsLoadingSales(false);
        return;
      }
      
      // Fetch book details for each sale
      const salesWithDetails = await Promise.all(
        sales.map(async (sale: any, index: number) => {
          try {
            const bookId = sale.bookId.toNumber ? sale.bookId.toNumber() : sale.bookId;
            const book = await contract.getBook(bookId);
            const quantity = sale.quantity.toNumber ? sale.quantity.toNumber() : sale.quantity;
            const sellPrice = sale.sellPrice;
            const purchasePrice = sale.purchasePrice;
            const profit = sale.profit;
            const timestamp = sale.timestamp.toNumber ? sale.timestamp.toNumber() : sale.timestamp;
            
            const isBookManager = currentAccount?.toLowerCase() === BOOK_MANAGER_ADDRESS.toLowerCase();
            // Check if purchasePrice is zero (store sale) - purchasePrice is a BigNumber from contract
            const isStoreSale = purchasePrice.isZero ? purchasePrice.isZero() : purchasePrice.toString() === '0';
            const purchasePriceFormatted = isStoreSale && isBookManager 
              ? "Store Owner" 
              : ethers.utils.formatEther(purchasePrice);
            
            return {
              bookId: bookId,
              title: book[1],
              author: book[2],
              buyer: sale.buyer,
              quantity: quantity,
              sellPrice: ethers.utils.formatEther(sellPrice),
              purchasePrice: purchasePriceFormatted,
              purchasePriceRaw: purchasePrice,
              profit: ethers.utils.formatEther(profit),
              totalProfit: ethers.utils.formatEther(profit.mul(ethers.BigNumber.from(quantity))),
              timestamp: new Date(timestamp * 1000).toLocaleString(),
              isStoreSale: isStoreSale && isBookManager
            };
          } catch (error) {
            console.error(`Error fetching book ${sale.bookId} at index ${index}:`, error);
            return null;
          }
        })
      );
      
      const validSales = salesWithDetails.filter((sale: any) => sale !== null);
      console.log("Valid sales:", validSales);
      
      setSalesHistory(validSales);
      setTotalProfit(ethers.utils.formatEther(totalProfitWei));
      setIsLoadingSales(false);
    } catch (error: any) {
      console.error("Error fetching sales history:", error);
      if (error.message && error.message.includes("getSalesHistory")) {
        showToast("Contract function not found. Please redeploy the contract.", 'error');
      } else {
        showToast("Failed to fetch sales history. Check console for details.", 'error');
      }
      setIsLoadingSales(false);
    }
  };

  // Fetch total books count (for admin)
  const fetchTotalBooksCount = async () => {
    if (!contract || !isBookManager) {
      setTotalBooksCount(0);
      return;
    }
    
    try {
      setIsLoadingBooksCount(true);
      if (contract.getTotalBooksCount) {
        const count = await contract.getTotalBooksCount();
        setTotalBooksCount(count.toNumber ? count.toNumber() : count);
      }
      setIsLoadingBooksCount(false);
    } catch (error: any) {
      console.error("Error fetching total books count:", error);
      setIsLoadingBooksCount(false);
    }
  };

  // Update book function
  const handleUpdateBook = async () => {
    if (!contract || !editingBook) return;
    
    try {
      setIsUpdatingBook(true);
      const priceWei = ethers.utils.parseEther(updateFormData.price);
      const stock = parseInt(updateFormData.stock);
      
      const tx = await contract.updateBook(
        editingBook.id,
        updateFormData.title,
        updateFormData.author,
        priceWei,
        stock,
        updateFormData.imageUrl,
        updateFormData.genre
      );
      
      showToast("Transaction sent! Waiting for confirmation...", 'info');
      await tx.wait();
      showToast("Book updated successfully!", 'success');
      
      setIsUpdateModalOpen(false);
      setEditingBook(null);
      setIsUpdatingBook(false);
      
      // Refresh data
      fetchAllBooks();
      fetchTotalBooksCount();
      setTimeout(() => {
        fetchAllBooks();
        fetchTotalBooksCount();
      }, 3000);
    } catch (error: any) {
      console.error("Error updating book:", error);
      showToast(`Failed to update book: ${error.message || error}`, 'error');
      setIsUpdatingBook(false);
    }
  };

  // Delete book function
  const handleDeleteBook = async () => {
    if (!contract || !bookToDelete) return;
    
    try {
      setIsDeletingBook(true);
      const tx = await contract.deleteBook(bookToDelete.id);
      
      showToast("Transaction sent! Waiting for confirmation...", 'info');
      await tx.wait();
      showToast("Book deleted successfully!", 'success');
      
      setIsDeleteModalOpen(false);
      setBookToDelete(null);
      setIsDeletingBook(false);
      
      // Refresh data
      fetchAllBooks();
      fetchTotalBooksCount();
      setTimeout(() => {
        fetchAllBooks();
        fetchTotalBooksCount();
      }, 3000);
    } catch (error: any) {
      console.error("Error deleting book:", error);
      showToast(`Failed to delete book: ${error.message || error}`, 'error');
      setIsDeletingBook(false);
    }
  };

  // Open update modal
  const openUpdateModal = (book: any) => {
    setEditingBook(book);
    // Format price if it's a number or BigNumber
    let priceValue: string = "";
    try {
      if (typeof book.price === 'string') {
        priceValue = book.price;
      } else if (book.price && typeof book.price.toNumber === 'function') {
        priceValue = ethers.utils.formatEther(book.price);
      } else if (typeof book.price === 'number') {
        priceValue = book.price.toString();
      } else {
        priceValue = parseFloat(String(book.price || 0)).toString();
      }
    } catch (e) {
      priceValue = String(book.price || "0");
    }
    
    // Format stock
    let stockValue: string = "0";
    try {
      if (typeof book.stock === 'string') {
        stockValue = book.stock;
      } else if (book.stock && typeof book.stock.toString === 'function') {
        stockValue = book.stock.toString();
      } else if (typeof book.stock === 'number') {
        stockValue = book.stock.toString();
      } else {
        stockValue = String(book.stock || 0);
      }
    } catch (e) {
      stockValue = String(book.stock || 0);
    }
    
    setUpdateFormData({
      title: String(book.title || ""),
      author: String(book.author || ""),
      price: priceValue,
      stock: stockValue,
      imageUrl: String(book.imageUrl || ""),
      genre: String(book.genre || "")
    });
    setIsUpdateModalOpen(true);
  };

  const [bookDataAdd, setBookDataAdd] = useState({
    title: "",
    author: "",
    price: "",
    stock: "",
    imageUrl: "",
    genre: ""
  });



  const bookDataAddChange = (e: any) => {
    setBookDataAdd({
      ...bookDataAdd,
      [e.target.id]: e.target.value,
    });
  };

  const handlePurchaseFromModal = async () => {
    if (!selectedBook) return;
    const result = await purchaseBook(selectedBook.id, purchaseQuantity);
    if (result?.success) {
      setIsPurchaseModalOpen(false);
      setSelectedBook(null);
      setPurchaseQuantity("1");
      fetchAllBooks();
      fetchMyPurchases();
    }
  };

  const handleAddBook = async () => {
    const result = await addBook(
      bookDataAdd.title,
      bookDataAdd.author,
      bookDataAdd.price,
      bookDataAdd.stock,
      bookDataAdd.imageUrl,
      bookDataAdd.genre
    );
    if (result?.success) {
      setBookDataAdd({ title: "", author: "", price: "", stock: "", imageUrl: "", genre: "" });
      fetchAllBooks();
    }
  };

  const handleListForSale = async (bookId: any, price: any, quantity: any) => {
    const result = await listForSale(bookId, price, quantity);
    if (result?.success) {
      // Clear the input fields
      const quantityInput = document.getElementById(`listQuantity-${bookId}`) as HTMLInputElement;
      const priceInput = document.getElementById(`listPrice-${bookId}`) as HTMLInputElement;
      if (quantityInput) quantityInput.value = "1";
      if (priceInput) priceInput.value = "";
      setTimeout(() => {
        fetchMyPurchases();
        fetchMarketplaceListings();
      }, 2000);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-4 sm:px-8 lg:px-24 py-8 sm:py-12 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      {/* Toast Notification */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}

      {/* Purchase Modal */}
      {isPurchaseModalOpen && selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-800">Purchase Book</h3>
          <button
                  onClick={() => {
                    setIsPurchaseModalOpen(false);
                    setSelectedBook(null);
                    setPurchaseQuantity("1");
                  }}
                  className="btn btn-sm btn-circle btn-ghost"
                >
                  ✕
          </button>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-shrink-0">
                  <img
                    src={selectedBook.imageUrl || `https://via.placeholder.com/200x300/4A90E2/FFFFFF?text=${encodeURIComponent(selectedBook.title)}`}
                    alt={selectedBook.title}
                    className="w-32 h-48 object-cover rounded-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://via.placeholder.com/200x300/4A90E2/FFFFFF?text=${encodeURIComponent(selectedBook.title)}`;
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-800 mb-2">{selectedBook.title}</h4>
                  <p className="text-gray-600 mb-2">by {selectedBook.author}</p>
                  {selectedBook.genre && (
                    <p className="mb-2">
                      <span className="badge badge-outline">{selectedBook.genre}</span>
                    </p>
                  )}
                  <p className="text-2xl font-bold text-primary mb-2">
                    {parseFloat(selectedBook.price).toFixed(4)} ETH
                  </p>
                  <p className="text-sm text-gray-600">
                    Stock Available: <span className="font-semibold">{selectedBook.stock}</span>
                  </p>
                </div>
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-semibold">Quantity</span>
                </label>
          <input
            type="number"
                  className="input input-bordered focus:input-primary"
                  min="1"
                  max={selectedBook.stock}
                  value={purchaseQuantity}
                  onChange={(e) => setPurchaseQuantity(e.target.value)}
                  disabled={!selectedBook.available}
                />
                <label className="label">
                  <span className="label-text-alt text-gray-400">
                    Maximum: {selectedBook.stock} copies
                  </span>
                </label>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total Price:</span>
                  <span className="text-xl font-bold text-primary">
                    {(parseFloat(selectedBook.price) * parseFloat(purchaseQuantity || "1")).toFixed(4)} ETH
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
          <button
                  onClick={() => {
                    setIsPurchaseModalOpen(false);
                    setSelectedBook(null);
                    setPurchaseQuantity("1");
                  }}
                  className="btn btn-outline flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePurchaseFromModal}
                  className="btn btn-primary flex-1"
                  disabled={!selectedBook.available || !purchaseQuantity || parseInt(purchaseQuantity) < 1 || parseInt(purchaseQuantity) > selectedBook.stock || isPurchasing}
                >
                  {isPurchasing ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      🛒 Purchase
                    </>
                  )}
          </button>
        </div>
            </div>
          </div>
        </div>
      )}

      {/* Book Viewer Modal */}
      {isBookViewerOpen && viewingBook && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col border border-gray-200 animate-fade-in">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{viewingBook.title}</h2>
                <p className="text-gray-600 mt-1">by {viewingBook.author}</p>
              </div>
              <button
                onClick={() => {
                  setIsBookViewerOpen(false);
                  setViewingBook(null);
                }}
                className="btn btn-sm btn-circle btn-ghost"
              >
                ✕
              </button>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="prose max-w-none">
                {(() => {
                  const bookContent = getBookContent(viewingBook.id);
                  // Split content by newlines and render with proper formatting
                  const lines = bookContent.content.split('\n');
                  return (
                    <div className="text-gray-800">
                      {lines.map((line: string, index: number) => {
                        if (line.startsWith('# ')) {
                          return <h1 key={index} className="text-3xl font-bold mt-6 mb-4 text-gray-900">{line.substring(2)}</h1>;
                        } else if (line.startsWith('## ')) {
                          return <h2 key={index} className="text-2xl font-semibold mt-5 mb-3 text-gray-900">{line.substring(3)}</h2>;
                        } else if (line.startsWith('### ')) {
                          return <h3 key={index} className="text-xl font-semibold mt-4 mb-2 text-gray-900">{line.substring(4)}</h3>;
                        } else if (line.trim() === '') {
                          return <br key={index} />;
                        } else {
                          return <p key={index} className="mb-4 leading-relaxed text-gray-700">{line}</p>;
                        }
                      })}
                    </div>
                  );
                })()}
              </div>
            </div>
            
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-12 animate-fade-in">
        <div className="inline-block mb-4">
          <div className="relative">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold gradient-text pb-2 mb-2 relative z-10">
              📚 BookVerse
            </h1>
            <div className="absolute inset-0 blur-2xl opacity-30 gradient-bg rounded-full"></div>
          </div>
        </div>
        <p className="text-lg sm:text-xl text-gray-600 font-medium">Decentralized Book Marketplace on Blockchain</p>
        <div className="flex justify-center gap-2 mt-4">
          <span className="badge badge-primary badge-lg">✨ NFT Books</span>
          <span className="badge badge-secondary badge-lg">🔒 Secure</span>
          <span className="badge badge-accent badge-lg">🌐 Decentralized</span>
        </div>
      </div>

      {!contract && (
        <div className="flex justify-center mt-12 relative z-10">
          <div className="max-w-md mx-auto text-center">
            <div className="mb-8">
              <div className="inline-block p-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl animate-pulse-glow">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to BookVerse</h2>
            <p className="text-gray-600 mb-8 text-lg">Connect your MetaMask wallet to explore our decentralized book marketplace</p>
            <button
              onClick={connectToContract}
              className="btn btn-primary btn-lg text-lg px-10 py-4 shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 rounded-full font-semibold gradient-bg-blue text-white border-0"
            >
              <span className="mr-2">🦊</span>
              Connect MetaMask Wallet
            </button>
            <p className="mt-6 text-sm text-gray-500">Make sure MetaMask is installed and unlocked</p>
          </div>
        </div>
      )}

      {contract && (
        <div className="w-full max-w-7xl mx-auto">
          {/* Account Info */}
          {currentAccount && (
            <div className="mb-8 p-6 glass-effect rounded-2xl shadow-xl border border-white/20 text-center relative z-10 card-hover">
              <div className="flex items-center justify-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-gray-800">Connected Account:</span>{" "}
                  <span className="font-mono text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-lg">{currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}</span>
                </p>
              </div>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="tabs tabs-boxed glass-effect shadow-xl mb-8 justify-center flex-wrap gap-2 rounded-2xl p-2 relative z-10">
            {/* Operations tab - Only visible to Account #2 (Book Manager) */}
            {isBookManager && (
              <button
                className={`tab ${activeTab === 'operations' ? 'tab-active font-semibold' : ''}`}
                onClick={() => setActiveTab('operations')}
              >
                ⚙️ Operations
              </button>
            )}
            
            {/* All other tabs - Visible to all users (including Account #2) */}
            <button
              className={`tab ${activeTab === 'allBooks' ? 'tab-active font-semibold' : ''}`}
              onClick={() => {
                setActiveTab('allBooks');
                fetchAllBooks();
              }}
            >
              📖 All Books
            </button>
            <button
              className={`tab ${activeTab === 'myPurchases' ? 'tab-active font-semibold' : ''}`}
              onClick={() => {
                setActiveTab('myPurchases');
                if (currentAccount) {
                  fetchMyPurchases();
                }
              }}
            >
              🛒 My Purchases
            </button>
            <button
              className={`tab ${activeTab === 'marketplace' ? 'tab-active font-semibold' : ''}`}
              onClick={() => {
                setActiveTab('marketplace');
                fetchMarketplaceListings();
              }}
            >
              🏪 Marketplace
            </button>
            <button
              className={`tab ${activeTab === 'profile' ? 'tab-active font-semibold' : ''}`}
              onClick={() => {
                setActiveTab('profile');
                if (currentAccount) {
                  fetchMyPurchases();
                }
              }}
            >
              👤 Profile
            </button>
            <button
              className={`tab ${activeTab === 'whitelist' ? 'tab-active font-semibold' : ''}`}
              onClick={() => {
                setActiveTab('whitelist');
                if (currentAccount) {
                  fetchWhitelist();
                }
              }}
            >
              ❤️ Favorites
            </button>
          </div>

          {/* Operations Tab - Only visible to Book Manager (Account #2) */}
          {activeTab === 'operations' && isBookManager && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {/* Add Book Card */}
              <div className="card glass-effect shadow-2xl border border-white/30 card-hover rounded-2xl overflow-hidden">
                <div className="card-body">
                  <h2 className="card-title text-blue-600">
                    ➕ Add New Book
                    {isBookManager && <span className="badge badge-success badge-sm ml-2">Book Manager</span>}
                  </h2>
                  <div className="alert alert-info py-2 my-2">
                    <span className="text-xs">You are the Book Manager - You can add books to the store</span>
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Title</span>
                    </label>
          <input
                      className="input input-bordered focus:input-primary"
            type="text"
            id="title"
            value={bookDataAdd.title}
            onChange={bookDataAddChange}
                      disabled={!isBookManager}
                      placeholder="Book title"
                    />
                  </div>
                  <div className="form-control mt-2">
                    <label className="label">
                      <span className="label-text font-semibold">Author</span>
                    </label>
          <input
                      className="input input-bordered focus:input-primary"
            type="text"
            id="author"
            value={bookDataAdd.author}
            onChange={bookDataAddChange}
                      disabled={!isBookManager}
                      placeholder="Author name"
                    />
                  </div>
                  <div className="form-control mt-2">
                    <label className="label">
                      <span className="label-text font-semibold">Price (ETH)</span>
                    </label>
          <input
                      className="input input-bordered focus:input-primary"
            type="number"
                      step="0.001"
            id="price"
            value={bookDataAdd.price}
            onChange={bookDataAddChange}
                      disabled={!isBookManager}
                      placeholder="0.0"
                      min="0"
                    />
                  </div>
                  <div className="form-control mt-2">
                    <label className="label">
                      <span className="label-text font-semibold">Stock</span>
                    </label>
          <input
                      className="input input-bordered focus:input-primary"
            type="number"
            id="stock"
            value={bookDataAdd.stock}
            onChange={bookDataAddChange}
                      disabled={!isBookManager}
                      placeholder="0"
                      min="0"
                    />
                  </div>
                  <div className="form-control mt-2">
                    <label className="label">
                      <span className="label-text font-semibold">Image URL (Optional)</span>
                    </label>
                    <input
                      className="input input-bordered focus:input-primary"
                      type="url"
                      id="imageUrl"
                      value={bookDataAdd.imageUrl}
                      onChange={bookDataAddChange}
                      disabled={!isBookManager}
                      placeholder="https://example.com/book-cover.jpg"
                    />
                    <label className="label">
                      <span className="label-text-alt text-gray-400">Leave empty for placeholder image</span>
                    </label>
                  </div>
                  <div className="form-control mt-2">
                    <label className="label">
                      <span className="label-text font-semibold">Genre *</span>
                    </label>
                    <select
                      className="select select-bordered focus:select-primary"
                      id="genre"
                      value={bookDataAdd.genre}
                      onChange={bookDataAddChange}
                      disabled={!isBookManager}
                    >
                      <option value="">Select Genre</option>
                      <option value="Fiction">Fiction</option>
                      <option value="Non-Fiction">Non-Fiction</option>
                      <option value="Science Fiction">Science Fiction</option>
                      <option value="Fantasy">Fantasy</option>
                      <option value="Mystery">Mystery</option>
                      <option value="Romance">Romance</option>
                      <option value="Thriller">Thriller</option>
                      <option value="Biography">Biography</option>
                      <option value="History">History</option>
                      <option value="Science">Science</option>
                      <option value="Technology">Technology</option>
                      <option value="Philosophy">Philosophy</option>
                      <option value="Business">Business</option>
                      <option value="Self-Help">Self-Help</option>
                      <option value="General">General</option>
                    </select>
                  </div>
          <button
                    className="btn btn-primary mt-4 w-full"
                    onClick={handleAddBook}
                    disabled={!isBookManager || isLoading || !bookDataAdd.title || !bookDataAdd.author || !bookDataAdd.price || !bookDataAdd.stock || !bookDataAdd.genre}
                  >
                    {isLoading ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Adding...
                      </>
                    ) : (
                      'Add Book'
                    )}
          </button>
                </div>
        </div>

                </div>
          )}

          {/* All Books Tab */}
          {activeTab === 'allBooks' && (
            <div className="mt-6">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-4xl font-extrabold gradient-text">📚 All Books in Store</h2>
                <button
                  onClick={fetchAllBooks}
                  className="btn btn-outline btn-sm rounded-full shadow-md hover:shadow-lg transition-all"
                  disabled={isLoadingAllBooks}
                >
                  {isLoadingAllBooks ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Loading...
                    </>
                  ) : (
                    <>
                      🔄 Refresh
                    </>
                  )}
                </button>
              </div>
              
              {storeOwner && (
                <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <span className="font-semibold">Store Owner:</span>{" "}
                    <span className="font-mono">{storeOwner.slice(0, 10)}...{storeOwner.slice(-8)}</span>
                  </p>
                </div>
              )}

              {/* Search Section */}
              <div className="card glass-effect shadow-xl border border-white/30 mb-8 rounded-2xl overflow-hidden">
                <div className="card-body p-6">
                  <h3 className="card-title text-2xl mb-6 font-bold gradient-text">🔍 Search Books</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Genre Filter */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Filter by Genre</span>
                      </label>
                      <select
                        className="select select-bordered focus:select-primary"
                        value={searchGenre}
                        onChange={(e) => setSearchGenre(e.target.value)}
                      >
                        <option value="">All Genres</option>
                        <option value="Fiction">Fiction</option>
                        <option value="Non-Fiction">Non-Fiction</option>
                        <option value="Science Fiction">Science Fiction</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Mystery">Mystery</option>
                        <option value="Romance">Romance</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Biography">Biography</option>
                        <option value="History">History</option>
                        <option value="Science">Science</option>
                        <option value="Technology">Technology</option>
                        <option value="Philosophy">Philosophy</option>
                        <option value="Business">Business</option>
                        <option value="Self-Help">Self-Help</option>
                        <option value="General">General</option>
                      </select>
                    </div>
                    {/* Name/Author Search */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Search by Title or Author</span>
                      </label>
                      <input
                        type="text"
                        className="input input-bordered focus:input-primary"
                        placeholder="Enter book title or author name..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                      />
                    </div>
                    {/* Price Range Filter */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Min Price (ETH)</span>
                      </label>
                      <input
                        type="number"
                        className="input input-bordered focus:input-primary"
                        placeholder="0.0"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        min="0"
                        step="0.001"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Max Price (ETH)</span>
                      </label>
                      <input
                        type="number"
                        className="input input-bordered focus:input-primary"
                        placeholder="No limit"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        min="0"
                        step="0.001"
                      />
                    </div>
                  </div>
                  {(searchGenre || searchText || minPrice || maxPrice) && (
                    <div className="mt-4">
                      <button
                        className="btn btn-sm btn-outline"
            onClick={() => {
                          setSearchGenre("");
                          setSearchText("");
                          setMinPrice("");
                          setMaxPrice("");
                        }}
                      >
                        Clear Filters
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Filter books based on search criteria */}
              {(() => {
                const filteredBooks = allBooks.filter((book) => {
                  const matchesGenre = !searchGenre || book.genre?.toLowerCase() === searchGenre.toLowerCase();
                  const matchesText = !searchText || 
                    book.title?.toLowerCase().includes(searchText.toLowerCase()) ||
                    book.author?.toLowerCase().includes(searchText.toLowerCase());
                  
                  // Price filtering
                  const bookPrice = parseFloat(book.price);
                  const minPriceNum = minPrice ? parseFloat(minPrice) : 0;
                  const maxPriceNum = maxPrice ? parseFloat(maxPrice) : Infinity;
                  const matchesPrice = bookPrice >= minPriceNum && bookPrice <= maxPriceNum;
                  
                  return matchesGenre && matchesText && matchesPrice;
                });

                if (isLoadingAllBooks) {
                  return (
                    <div className="text-center py-12">
                      <span className="loading loading-spinner loading-lg text-primary"></span>
                      <p className="mt-4 text-gray-600">Loading books...</p>
                    </div>
                  );
                }

                if (allBooks.length === 0) {
                  return (
                    <div className="text-center py-12 bg-white rounded-lg shadow border border-gray-200">
                      <p className="text-gray-500 text-lg">📭 No books found in the store.</p>
                      <p className="text-sm text-gray-400 mt-2">Add books using the Operations tab (Account #2 only)</p>
                    </div>
                  );
                }

                if (filteredBooks.length === 0) {
                  return (
                    <div className="text-center py-12 bg-white rounded-lg shadow border border-gray-200">
                      <p className="text-gray-500 text-lg">🔍 No books found matching your search criteria.</p>
                      <p className="text-sm text-gray-400 mt-2">Try adjusting your filters</p>
                    </div>
                  );
                }

                return (
                  <>
                    {filteredBooks.length < allBooks.length && (
                      <div className="mb-4 text-sm text-gray-600">
                        Showing {filteredBooks.length} of {allBooks.length} books
                      </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredBooks.map((book) => {
                    const imageUrl = book.imageUrl || `https://via.placeholder.com/300x400/4A90E2/FFFFFF?text=${encodeURIComponent(book.title)}`;
                    return (
                      <div 
                        key={book.id} 
                        className="card glass-effect shadow-xl border border-white/30 card-hover cursor-pointer rounded-2xl overflow-hidden group relative"
                        onClick={() => {
                          if (book.available) {
                            setSelectedBook(book);
                            setPurchaseQuantity("1");
                            setIsPurchaseModalOpen(true);
                          }
                        }}
                      >
                        <figure className="h-64 bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                          <img 
                            src={imageUrl} 
                            alt={book.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `https://via.placeholder.com/300x400/667eea/FFFFFF?text=${encodeURIComponent(book.title)}`;
                            }}
                          />
                          {book.genre && (
                            <div className="absolute top-3 right-3 z-20">
                              <span className="badge badge-primary badge-sm shadow-lg">{book.genre}</span>
                            </div>
                          )}
                        </figure>
                        <div className="card-body p-5 bg-white/80 backdrop-blur-sm">
                          <h2 className="card-title text-lg font-bold text-gray-800 line-clamp-2 min-h-[3rem] group-hover:text-purple-600 transition-colors">
                            {book.title}
                          </h2>
                          <p className="text-gray-600 text-sm font-medium">by {book.author}</p>
                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                            <div>
                              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                {parseFloat(book.price).toFixed(4)} ETH
                              </span>
                            </div>
                            <span className="badge badge-info badge-lg shadow-md">
                              📦 {book.stock}
                            </span>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            {book.available ? (
                              <span className="badge badge-success badge-lg shadow-md">✅ Available</span>
                            ) : (
                              <span className="badge badge-error badge-lg shadow-md">❌ Out of Stock</span>
                            )}
                            <span className="text-xs text-gray-400 font-mono bg-gray-100 px-2 py-1 rounded">
                              #{book.id}
                            </span>
                          </div>
                          {book.latestBuyer && (
                            <div className="mt-2 pt-2 border-t border-gray-200">
                              <p className="text-xs text-gray-500">
                                <span className="font-semibold">Owner:</span>{" "}
                                <span className="font-mono">{book.latestBuyer.slice(0, 6)}...{book.latestBuyer.slice(-4)}</span>
                              </p>
                            </div>
                          )}
                          <div className="flex items-center justify-between mt-3">
                            {currentAccount && (
                              <button
                                className={`btn btn-sm btn-circle ${whitelistedBookIds.has(book.id) ? 'btn-error' : 'btn-ghost'}`}
                                onClick={async (e) => {
                                  e.stopPropagation();
                                  if (whitelistedBookIds.has(book.id)) {
                                    const result = await removeFromWhitelist(book.id);
                                    if (result?.success) {
                                      setWhitelistedBookIds(prev => {
                                        const newSet = new Set(prev);
                                        newSet.delete(book.id);
                                        return newSet;
                                      });
                                      // Refresh whitelist tab if active
                                      setTimeout(() => {
                                        if (activeTab === ('whitelist' as any)) {
                                          fetchWhitelist();
                                        }
                                      }, 100);
                                    }
                                  } else {
                                    const result = await addToWhitelist(book.id);
                                    if (result?.success) {
                                      setWhitelistedBookIds(prev => new Set(prev).add(book.id));
                                    }
                                  }
                                }}
                                disabled={isWhitelisting}
                                title={whitelistedBookIds.has(book.id) ? "Remove from favorites" : "Add to favorites"}
                              >
                                {isWhitelisting ? (
                                  <span className="loading loading-spinner loading-xs"></span>
                                ) : whitelistedBookIds.has(book.id) ? (
                                  '❤️'
                                ) : (
                                  '🤍'
                                )}
                              </button>
                            )}
                            <button
                              className="btn btn-primary btn-sm flex-1 ml-2 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 font-semibold"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (book.available) {
                                  setSelectedBook(book);
                                  setPurchaseQuantity("1");
                                  setIsPurchaseModalOpen(true);
                                }
                              }}
                              disabled={!book.available}
                            >
                              {book.available ? '🛒 Purchase' : 'Out of Stock'}
                            </button>
        </div>
                        </div>
                      </div>
                    );
                  })}
                    </div>
                  </>
                );
              })()}
            </div>
          )}

          {/* My Purchases Tab */}
          {activeTab === 'myPurchases' && (
            <div className="mt-6">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-4xl font-extrabold gradient-text">🛒 My Purchased Books</h2>
                <button
                  onClick={fetchMyPurchases}
                  className="btn btn-outline btn-sm"
                  disabled={isLoadingMyPurchases || !currentAccount}
                >
                  {isLoadingMyPurchases ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Loading...
                    </>
                  ) : (
                    <>
                      🔄 Refresh
                    </>
                  )}
                </button>
              </div>

              {!currentAccount ? (
                <div className="text-center py-12 bg-white rounded-lg shadow border border-gray-200">
                  <p className="text-gray-500 text-lg">🔐 Please connect your MetaMask account to view your purchases.</p>
                </div>
              ) : isLoadingMyPurchases ? (
                <div className="text-center py-12">
                  <span className="loading loading-spinner loading-lg text-primary"></span>
                  <p className="mt-4 text-gray-600">Loading your purchases...</p>
                </div>
              ) : myBooks.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow border border-gray-200">
                  <p className="text-gray-500 text-lg">📭 No books currently owned.</p>
                  <p className="text-sm text-gray-400 mt-2">Purchase books from the store or marketplace to see them here.</p>
                  <p className="text-xs text-gray-300 mt-1">Note: Books you've sold to other users won't appear here.</p>
                </div>
              ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow-lg border border-gray-200">
                  <table className="table w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="font-semibold">ID</th>
                        <th className="font-semibold">Title</th>
                        <th className="font-semibold">Author</th>
                        <th className="font-semibold">Store Price</th>
                        <th className="font-semibold">Qty Owned</th>
                        <th className="font-semibold">Listing Status</th>
                        <th className="font-semibold">Total Paid</th>
                        <th className="font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myBooks.map((book) => (
                        <tr key={book.id} className="hover:bg-gray-50">
                          <td className="font-bold text-primary">{book.id}</td>
                          <td className="font-medium">{book.title}</td>
                          <td>{book.author}</td>
                          <td className="font-semibold">{parseFloat(book.price).toFixed(4)} ETH</td>
                          <td>
                            <span className="badge badge-info badge-lg">{book.purchasedQuantity}</span>
                          </td>
                          <td>
                            {book.isListed ? (
                              <div className="flex flex-col gap-1">
                                <span className="badge badge-success">✅ Listed</span>
                                <span className="text-xs text-gray-600">Price: {book.listingPrice} ETH</span>
                                <span className="text-xs text-gray-600">Qty: {book.listingQuantity}</span>
                              </div>
                            ) : (
                              <span className="badge badge-ghost">Not Listed</span>
                            )}
                          </td>
                          <td className="font-semibold">
                            {(parseFloat(book.price) * book.purchasedQuantity).toFixed(4)} ETH
                          </td>
                          <td>
                            <div className="flex flex-col gap-2 min-w-[200px]">
                              <div className="flex gap-2 items-center">
            <input
              type="number"
                                  min="1"
                                  max={book.purchasedQuantity}
                                  defaultValue="1"
                                  className="input input-bordered input-sm w-16"
                                  id={`listQuantity-${book.id}`}
                                />
                                <input
                                  type="number"
                                  step="0.001"
                                  min="0.001"
                                  placeholder="Price"
                                  className="input input-bordered input-sm w-20"
                                  id={`listPrice-${book.id}`}
            />
            <button
                                  className="btn btn-success btn-sm"
              onClick={async () => {
                                    const quantityInput = document.getElementById(`listQuantity-${book.id}`) as HTMLInputElement;
                                    const priceInput = document.getElementById(`listPrice-${book.id}`) as HTMLInputElement;
                                    const quantity = parseInt(quantityInput.value) || 1;
                                    const price = parseFloat(priceInput.value) || 0;
                                    
                                    if (quantity > 0 && quantity <= book.purchasedQuantity && price > 0) {
                                      await handleListForSale(book.id, price, quantity);
                                    } else {
                                      showToast(`Please enter valid quantity (1-${book.purchasedQuantity}) and price (>0)`, 'error');
                                    }
                                  }}
                                  disabled={isListing || book.purchasedQuantity === 0 || book.isListed}
                                >
                                  {isListing ? (
                                    <>
                                      <span className="loading loading-spinner loading-xs"></span>
                                    </>
                                  ) : (
                                    'List'
                                  )}
            </button>
          </div>
                              {book.isListed && (
                                <button
                                  className="btn btn-error btn-sm btn-outline"
                                  onClick={async () => {
                                    const result = await cancelListing(book.id);
                                    if (result?.success) {
                                      setTimeout(() => {
                                        fetchMyPurchases();
                                        fetchMarketplaceListings();
                                      }, 2000);
                                    }
                                  }}
                                  disabled={isListing}
                                >
                                  Cancel Listing
                                </button>
                              )}
                              <button
                                className="btn btn-primary btn-sm w-full mt-2"
                                onClick={() => {
                                  setViewingBook(book);
                                  setIsBookViewerOpen(true);
                                }}
                              >
                                📖 View Book
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Marketplace Tab */}
          {activeTab === 'marketplace' && (
            <div className="mt-6">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-4xl font-extrabold gradient-text">🏪 Marketplace - Buy from Users</h2>
                <button
                  onClick={fetchMarketplaceListings}
                  className="btn btn-outline btn-sm"
                  disabled={isLoadingMarketplace}
                >
                  {isLoadingMarketplace ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Loading...
                    </>
                  ) : (
                    <>
                      🔄 Refresh
                    </>
                  )}
                </button>
              </div>

              {/* Search Section for Marketplace */}
              <div className="card glass-effect shadow-xl border border-white/30 mb-8 rounded-2xl overflow-hidden">
                <div className="card-body p-6">
                  <h3 className="card-title text-2xl mb-6 font-bold gradient-text">🔍 Search Marketplace</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Genre Filter */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Filter by Genre</span>
                      </label>
                      <select
                        className="select select-bordered focus:select-primary"
                        value={searchGenreMarketplace}
                        onChange={(e) => setSearchGenreMarketplace(e.target.value)}
                      >
                        <option value="">All Genres</option>
                        <option value="Fiction">Fiction</option>
                        <option value="Non-Fiction">Non-Fiction</option>
                        <option value="Science Fiction">Science Fiction</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Mystery">Mystery</option>
                        <option value="Romance">Romance</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Biography">Biography</option>
                        <option value="History">History</option>
                        <option value="Science">Science</option>
                        <option value="Technology">Technology</option>
                        <option value="Philosophy">Philosophy</option>
                        <option value="Business">Business</option>
                        <option value="Self-Help">Self-Help</option>
                        <option value="General">General</option>
                      </select>
                    </div>
                    {/* Name/Author Search */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Search by Title or Author</span>
                      </label>
                      <input
                        type="text"
                        className="input input-bordered focus:input-primary"
                        placeholder="Enter book title or author name..."
                        value={searchTextMarketplace}
                        onChange={(e) => setSearchTextMarketplace(e.target.value)}
                      />
                    </div>
                    {/* Price Range Filter */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Min Price (ETH)</span>
                      </label>
                      <input
                        type="number"
                        className="input input-bordered focus:input-primary"
                        placeholder="0.0"
                        value={minPriceMarketplace}
                        onChange={(e) => setMinPriceMarketplace(e.target.value)}
                        min="0"
                        step="0.001"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Max Price (ETH)</span>
                      </label>
                      <input
                        type="number"
                        className="input input-bordered focus:input-primary"
                        placeholder="No limit"
                        value={maxPriceMarketplace}
                        onChange={(e) => setMaxPriceMarketplace(e.target.value)}
                        min="0"
                        step="0.001"
                      />
                    </div>
                  </div>
                  {(searchGenreMarketplace || searchTextMarketplace || minPriceMarketplace || maxPriceMarketplace) && (
                    <div className="mt-4">
                      <button
                        className="btn btn-sm btn-outline"
                        onClick={() => {
                          setSearchGenreMarketplace("");
                          setSearchTextMarketplace("");
                          setMinPriceMarketplace("");
                          setMaxPriceMarketplace("");
                        }}
                      >
                        Clear Filters
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Filter marketplace listings */}
              {(() => {
                // Filter listings based on search criteria
                const filteredListings = marketplaceListings.filter((listing: any) => {
                  const matchesGenre = !searchGenreMarketplace || listing.genre?.toLowerCase() === searchGenreMarketplace.toLowerCase();
                  const matchesText = !searchTextMarketplace || 
                    listing.title?.toLowerCase().includes(searchTextMarketplace.toLowerCase()) ||
                    listing.author?.toLowerCase().includes(searchTextMarketplace.toLowerCase());
                  
                  // Price filtering (use listing price, not original book price)
                  const listingPrice = parseFloat(listing.price);
                  const minPriceNum = minPriceMarketplace ? parseFloat(minPriceMarketplace) : 0;
                  const maxPriceNum = maxPriceMarketplace ? parseFloat(maxPriceMarketplace) : Infinity;
                  const matchesPrice = listingPrice >= minPriceNum && listingPrice <= maxPriceNum;
                  
                  return matchesGenre && matchesText && matchesPrice;
                });

                if (isLoadingMarketplace) {
                  return (
                    <div className="text-center py-12">
                      <span className="loading loading-spinner loading-lg text-primary"></span>
                      <p className="mt-4 text-gray-600">Loading marketplace listings...</p>
                    </div>
                  );
                }

                if (marketplaceListings.length === 0) {
                  return (
                    <div className="text-center py-12 bg-white rounded-lg shadow border border-gray-200">
                      <p className="text-gray-500 text-lg">📭 No books listed for sale by users.</p>
                      <p className="text-sm text-gray-400 mt-2">Users can list their purchased books in the "My Purchases" tab.</p>
                    </div>
                  );
                }

                if (filteredListings.length === 0) {
                  return (
                    <div className="text-center py-12 bg-white rounded-lg shadow border border-gray-200">
                      <p className="text-gray-500 text-lg">🔍 No listings found matching your search criteria.</p>
                      <p className="text-sm text-gray-400 mt-2">Try adjusting your filters</p>
                    </div>
                  );
                }

                return (
                  <>
                    {filteredListings.length < marketplaceListings.length && (
                      <div className="mb-4 text-sm text-gray-600">
                        Showing {filteredListings.length} of {marketplaceListings.length} listings
                      </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredListings.map((listing: any, index: number) => {
                    const imageUrl = listing.imageUrl || `https://via.placeholder.com/300x400/10B981/FFFFFF?text=${encodeURIComponent(listing.title)}`;
                    return (
                      <div key={`${listing.bookId}-${listing.seller}-${index}`} className="card glass-effect shadow-xl border border-white/30 card-hover rounded-2xl overflow-hidden group relative">
                        <figure className="h-64 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                          <img 
                            src={imageUrl} 
                            alt={listing.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `https://via.placeholder.com/300x400/10B981/FFFFFF?text=${encodeURIComponent(listing.title)}`;
                            }}
                          />
                        </figure>
                        <div className="card-body p-5 bg-white/80 backdrop-blur-sm">
                          <h2 className="card-title text-lg font-bold text-gray-800 line-clamp-2 min-h-[3rem] group-hover:text-teal-600 transition-colors">
                            {listing.title}
                          </h2>
                          <p className="text-gray-600 text-sm font-medium">by {listing.author}</p>
                          {listing.genre && (
                            <div className="mt-2">
                              <span className="badge badge-primary badge-sm shadow-md">{listing.genre}</span>
                            </div>
                          )}
                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                            <div>
                              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                {parseFloat(listing.price).toFixed(4)} ETH
                              </span>
                            </div>
                            <span className="badge badge-info badge-lg shadow-md">
                              📦 {listing.quantity}
                            </span>
                          </div>
                          <div className="mt-2 pt-2 border-t border-gray-200">
                            <p className="text-xs text-gray-500">
                              <span className="font-semibold">Seller:</span>{" "}
                              {listing.seller.toLowerCase() === currentAccount?.toLowerCase() 
                                ? <span className="badge badge-info badge-sm">You</span>
                                : <span className="font-mono">{listing.seller.slice(0, 6)}...{listing.seller.slice(-4)}</span>}
                            </p>
                          </div>
                          <div className="card-actions justify-end mt-3">
                            {listing.seller.toLowerCase() === currentAccount?.toLowerCase() ? (
                              <span className="text-xs text-gray-400 w-full text-center">Your listing</span>
                            ) : (
                              <div className="flex gap-2 items-center w-full">
                                <input
                                  type="number"
                                  min="1"
                                  max={listing.quantity}
                                  defaultValue="1"
                                  className="input input-bordered input-sm flex-1"
                                  id={`buyQuantity-${listing.bookId}-${listing.seller}`}
                                />
                                <button
                                  className="btn btn-primary btn-sm rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 font-semibold"
                                  onClick={async () => {
                                    const quantityInput = document.getElementById(`buyQuantity-${listing.bookId}-${listing.seller}`) as HTMLInputElement;
                                    const quantity = parseInt(quantityInput.value) || 1;
                                    if (quantity > 0 && quantity <= listing.quantity) {
                                      const result = await purchaseFromUser(listing.bookId, listing.seller, quantity);
                                      if (result?.success) {
                                        // Clear the quantity input
                                        if (quantityInput) quantityInput.value = "1";
                                        
                                        // Refresh immediately
                                        fetchMarketplaceListings();
                                        fetchAllBooks();
                                        fetchMyPurchases();
                                        fetchSalesHistory();
                                        
                                        // Refresh after transaction is confirmed (2 seconds)
                                        setTimeout(() => {
                                          fetchMarketplaceListings();
                                          fetchAllBooks();
                                          fetchMyPurchases();
                                          fetchSalesHistory();
                                        }, 2000);
                                        
                                        // Refresh again to ensure blockchain state is fully updated (4 seconds)
                                        setTimeout(() => {
                                          fetchMarketplaceListings();
                                          fetchAllBooks();
                                          fetchMyPurchases();
                                          fetchSalesHistory();
                                        }, 4000);
                                        
                                        // Final refresh for profile tab (6 seconds) - ensures ownership is updated
                                        setTimeout(() => {
                                          if (currentAccount) {
                                            fetchMyPurchases();
                                            fetchSalesHistory();
                                          }
                                        }, 6000);
                                      }
                                    } else {
                                      showToast(`Please enter a valid quantity (1-${listing.quantity})`, 'error');
                                    }
                                  }}
                                  disabled={isPurchasingFromUser || !currentAccount}
                                >
                                  {isPurchasingFromUser ? (
                                    <>
                                      <span className="loading loading-spinner loading-xs"></span>
                                    </>
                                  ) : (
                                    'Buy'
                                  )}
            </button>
          </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                    </div>
                  </>
                );
              })()}
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="mt-6">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-4xl font-extrabold gradient-text">👤 User Profile</h2>
                <button
                  onClick={() => {
                    if (currentAccount) {
                      fetchMyPurchases();
                      fetchSalesHistory();
                    }
                  }}
                  className="btn btn-outline btn-sm"
                  disabled={!currentAccount}
                >
                  🔄 Refresh
                </button>
              </div>

              {!currentAccount ? (
                <div className="text-center py-12 bg-white rounded-lg shadow border border-gray-200">
                  <p className="text-gray-500 text-lg">🔐 Please connect your MetaMask account to view your profile.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Profile Header */}
                  <div className="card bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
                    <div className="card-body">
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="avatar placeholder">
                          <div className="bg-white text-blue-600 rounded-full w-20 h-20">
                            <span className="text-3xl font-bold">
                              {currentAccount.slice(2, 4).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1 text-center sm:text-left">
                          <h2 className="card-title text-2xl mb-2">Your Profile</h2>
                          <p className="font-mono text-sm opacity-90 break-all">
                            {currentAccount}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Statistics Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Total Books Owned */}
                    <div className="card glass-effect shadow-2xl border border-white/30 card-hover rounded-2xl overflow-hidden">
                      <div className="card-body">
                        <div className="flex items-center justify-between">
              <div>
                            <p className="text-sm text-gray-500">Books Owned</p>
                            <p className="text-3xl font-bold text-primary">
                              {myBooks.reduce((sum, book) => sum + book.purchasedQuantity, 0)}
                            </p>
              </div>
                          <div className="text-4xl">📚</div>
                        </div>
                      </div>
                    </div>

                    {/* Total Books Purchased */}
                    <div className="card glass-effect shadow-2xl border border-white/30 card-hover rounded-2xl overflow-hidden">
                      <div className="card-body">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-500">Total Purchased</p>
                            <p className="text-3xl font-bold text-green-600">
                              {myBooks.length}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">Unique titles</p>
                          </div>
                          <div className="text-4xl">🛒</div>
                        </div>
                      </div>
                    </div>

                    {/* Total Value */}
                    <div className="card glass-effect shadow-2xl border border-white/30 card-hover rounded-2xl overflow-hidden">
                      <div className="card-body">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-500">Total Value</p>
                            <p className="text-3xl font-bold text-purple-600">
                              {myBooks.reduce((sum, book) => sum + (parseFloat(book.price) * book.purchasedQuantity), 0).toFixed(4)}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">ETH</p>
                          </div>
                          <div className="text-4xl">💰</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Total Profit */}
                    <div className="card glass-effect shadow-2xl border border-white/30 card-hover rounded-2xl overflow-hidden">
                      <div className="card-body">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600 font-medium mb-1">
                              {isBookManager ? 'Total Revenue' : 'Total Profit'}
                            </p>
                            <p className={`text-4xl font-extrabold ${parseFloat(totalProfit) > 0 ? 'bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent' : 'text-gray-400'}`}>
                              {parseFloat(totalProfit).toFixed(4)}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">ETH</p>
                            {isBookManager && (
                              <p className="text-xs text-gray-400 mt-1">From store sales</p>
                            )}
                          </div>
                          <div className="text-5xl opacity-20">{isBookManager ? '💰' : '📈'}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Active Listings / All Books (Admin) */}
                  <div className="card glass-effect shadow-2xl border border-white/30 card-hover rounded-2xl overflow-hidden">
                    <div className="card-body p-6">
                      <h3 className="card-title text-2xl mb-6 font-bold gradient-text">
                        {isBookManager ? '📚 All Books in Store (Manage)' : '📋 Active Listings'}
                      </h3>
                      {isBookManager ? (
                        // Admin view: Show all books in a compact table/list format
                        isLoadingAllBooks ? (
                          <div className="text-center py-8">
                            <span className="loading loading-spinner loading-lg text-primary"></span>
                            <p className="mt-4 text-gray-600">Loading books...</p>
                          </div>
                        ) : allBooks.length === 0 ? (
                          <p className="text-gray-500 text-center py-4">No books in store. Add books using the Operations tab.</p>
                        ) : (
                          <div className="overflow-x-auto">
                            <table className="table w-full">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="font-semibold">ID</th>
                                  <th className="font-semibold">Title</th>
                                  <th className="font-semibold">Author</th>
                                  <th className="font-semibold">Genre</th>
                                  <th className="font-semibold">Price (ETH)</th>
                                  <th className="font-semibold">Stock</th>
                                  <th className="font-semibold">Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {allBooks.map((book) => (
                                  <tr key={book.id} className="hover:bg-gray-50">
                                    <td className="font-mono text-sm text-gray-600">#{book.id}</td>
                                    <td>
                                      <div className="font-semibold text-gray-800">{book.title}</div>
                                    </td>
                                    <td className="text-gray-600">{book.author}</td>
                                    <td>
                                      {book.genre ? (
                                        <span className="badge badge-primary badge-sm">{book.genre}</span>
                                      ) : (
                                        <span className="text-gray-400 text-sm">-</span>
                                      )}
                                    </td>
                                    <td className="font-semibold text-purple-600">
                                      {parseFloat(book.price).toFixed(4)}
                                    </td>
                                    <td>
                                      <span className={`badge ${book.stock > 0 ? 'badge-info' : 'badge-error'}`}>
                                        {book.stock}
                                      </span>
                                    </td>
                                    <td>
                                      <div className="flex gap-2">
                                        <button
                                          className="btn btn-primary btn-xs"
                                          onClick={() => openUpdateModal(book)}
                                          title="Edit Book"
                                        >
                                          ✏️ Edit
                                        </button>
                                        <button
                                          className="btn btn-error btn-xs"
                                          onClick={() => {
                                            setBookToDelete(book);
                                            setIsDeleteModalOpen(true);
                                          }}
                                          title="Delete Book"
                                        >
                                          🗑️ Delete
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )
                      ) : (
                        // Regular user view: Show their active listings
                        myBooks.filter(book => book.isListed).length > 0 ? (
                          <div className="space-y-2">
                            {myBooks.filter(book => book.isListed).map((book) => (
                              <div key={book.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                  <p className="font-semibold">{book.title}</p>
                                  <p className="text-sm text-gray-600">
                                    {book.listingQuantity} copy(ies) at {book.listingPrice} ETH each
                                  </p>
                                </div>
                                <button
                                  className="btn btn-sm btn-outline"
                                  onClick={async () => {
                                    if (contract && currentAccount) {
                                      const result = await cancelListing(book.id);
                                      if (result?.success) {
                                        setTimeout(() => {
                                          if (currentAccount) {
                                            fetchMyPurchases();
                                          }
                                        }, 3000);
                                      }
                                    }
                                  }}
                                >
                                  Cancel Listing
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500 text-center py-4">No active listings</p>
                        )
                      )}
                    </div>
                  </div>

                  {/* Sales History */}
                  <div className="card glass-effect shadow-2xl border border-white/30 card-hover rounded-2xl overflow-hidden">
                    <div className="card-body p-6">
                      <h3 className="card-title text-2xl mb-6 font-bold gradient-text">💰 Sales History & Profit</h3>
                      {isLoadingSales ? (
                        <div className="text-center py-8">
                          <span className="loading loading-spinner loading-lg text-primary"></span>
                          <p className="mt-4 text-gray-600">Loading sales history...</p>
                        </div>
                      ) : salesHistory.length === 0 ? (
                        <div className="text-center py-4">
                          <p className="text-gray-500">
                            {isBookManager 
                              ? "No sales yet. When users purchase books from your store, sales will appear here!" 
                              : "No sales yet. List your books on the marketplace to start selling!"}
                          </p>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="table w-full">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="font-semibold">Book</th>
                                <th className="font-semibold">Buyer</th>
                                <th className="font-semibold">Qty</th>
                                <th className="font-semibold">{isBookManager ? 'Source' : 'Bought At'}</th>
                                <th className="font-semibold">Sold At</th>
                                <th className="font-semibold">Profit/Unit</th>
                                <th className="font-semibold">Total Profit</th>
                                <th className="font-semibold">Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {salesHistory.map((sale: any, index: number) => (
                                <tr key={index} className="hover:bg-gray-50">
                                  <td>
                                    <div>
                                      <p className="font-semibold">{sale.title}</p>
                                      <p className="text-xs text-gray-600">by {sale.author}</p>
                                    </div>
                                  </td>
                                  <td>
                                    <span className="font-mono text-xs">
                                      {sale.buyer.slice(0, 6)}...{sale.buyer.slice(-4)}
                                    </span>
                                  </td>
                                  <td>
                                    <span className="badge badge-info">{sale.quantity}</span>
                                  </td>
                                  <td className="text-sm">
                                    {sale.isStoreSale ? (
                                      <span className="badge badge-success badge-sm">Store Sale</span>
                                    ) : typeof sale.purchasePrice === 'string' && sale.purchasePrice === 'Store Owner' ? (
                                      <span className="badge badge-success badge-sm">Store Sale</span>
                                    ) : (
                                      `${parseFloat(sale.purchasePrice).toFixed(4)} ETH`
                                    )}
                                  </td>
                                  <td className="text-sm font-semibold text-green-600">
                                    {parseFloat(sale.sellPrice).toFixed(4)} ETH
                                  </td>
                                  <td className={`text-sm font-semibold ${parseFloat(sale.profit) > 0 ? 'text-green-600' : parseFloat(sale.profit) < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                                    {parseFloat(sale.profit) > 0 ? '+' : ''}{parseFloat(sale.profit).toFixed(4)} ETH
                                  </td>
                                  <td className={`text-sm font-bold ${parseFloat(sale.totalProfit) > 0 ? 'text-green-600' : parseFloat(sale.totalProfit) < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                                    {parseFloat(sale.totalProfit) > 0 ? '+' : ''}{parseFloat(sale.totalProfit).toFixed(4)} ETH
                                  </td>
                                  <td className="text-xs text-gray-500">
                                    {sale.timestamp}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                            <tfoot className="bg-gray-100">
                              <tr>
                                <td colSpan={6} className="text-right font-bold">
                                  {isBookManager ? 'Total Revenue (Store Sales):' : 'Total Profit:'}
                                </td>
                                <td className={`font-bold text-lg ${parseFloat(totalProfit) > 0 ? 'text-green-600' : 'text-gray-600'}`}>
                                  {parseFloat(totalProfit) > 0 ? '+' : ''}{parseFloat(totalProfit).toFixed(4)} ETH
                                </td>
                                <td></td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Your Book Collection */}
                  <div className="card glass-effect shadow-2xl border border-white/30 card-hover rounded-2xl overflow-hidden">
                    <div className="card-body">
                      <h3 className="card-title text-2xl mb-6 font-bold gradient-text">📖 Your Book Collection</h3>
                      {myBooks.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {myBooks.map((book) => {
                            const imageUrl = book.imageUrl || `https://via.placeholder.com/200x300/4A90E2/FFFFFF?text=${encodeURIComponent(book.title)}`;
                            return (
                              <div key={book.id} className="card bg-gray-50 border border-gray-200 hover:shadow-md transition-shadow">
                                <figure className="h-48 bg-gradient-to-br from-blue-100 to-purple-100">
                                  <img 
                                    src={imageUrl} 
                                    alt={book.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = `https://via.placeholder.com/200x300/4A90E2/FFFFFF?text=${encodeURIComponent(book.title)}`;
                                    }}
                                  />
                                </figure>
                                <div className="card-body p-3">
                                  <h4 className="card-title text-sm font-bold line-clamp-2 min-h-[2.5rem]">
                                    {book.title}
                                  </h4>
                                  <p className="text-xs text-gray-600">by {book.author}</p>
                                  <div className="flex items-center justify-between mt-2">
                                    <span className="badge badge-info badge-sm">
                                      Qty: {book.purchasedQuantity}
                                    </span>
                                    {book.isListed && (
                                      <span className="badge badge-success badge-sm">Listed</span>
                                    )}
                                  </div>
                                  <p className="text-xs text-gray-500 mt-1">
                                    Paid: {(parseFloat(book.price) * book.purchasedQuantity).toFixed(4)} ETH
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <p className="text-gray-500 text-lg">📭 No books in your collection yet.</p>
                          <p className="text-sm text-gray-400 mt-2">Purchase books from the store or marketplace to build your collection!</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Whitelist Tab */}
          {activeTab === 'whitelist' && (
            <div className="mt-6">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-4xl font-extrabold gradient-text">❤️ My Favorites</h2>
                <button
                  onClick={fetchWhitelist}
                  className="btn btn-outline btn-sm"
                  disabled={isLoadingWhitelist}
                >
                  {isLoadingWhitelist ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Refreshing...
                    </>
                  ) : (
                    '🔄 Refresh'
                  )}
                </button>
              </div>

              {!currentAccount ? (
                <div className="text-center py-12 bg-white rounded-lg shadow border border-gray-200">
                  <p className="text-gray-500 text-lg">🔒 Please connect your wallet to view favorites</p>
                </div>
              ) : isLoadingWhitelist ? (
                <div className="text-center py-12">
                  <span className="loading loading-spinner loading-lg text-primary"></span>
                  <p className="mt-4 text-gray-600">Loading favorites...</p>
                </div>
              ) : whitelistedBooks.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow border border-gray-200">
                  <p className="text-gray-500 text-lg">📭 No favorite books yet.</p>
                  <p className="text-sm text-gray-400 mt-2">Click the heart icon on any book to add it to your favorites!</p>
                </div>
              ) : (
                <>
                  <div className="mb-4 text-sm text-gray-600">
                    You have {whitelistedBooks.length} favorite book{whitelistedBooks.length !== 1 ? 's' : ''}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {whitelistedBooks.map((book) => {
                      const imageUrl = book.imageUrl || `https://via.placeholder.com/300x400/4A90E2/FFFFFF?text=${encodeURIComponent(book.title)}`;
                      return (
                        <div 
                          key={book.id} 
                          className="card bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
                        >
                          <figure className="h-64 bg-gradient-to-br from-blue-100 to-purple-100">
                            <img 
                              src={imageUrl} 
                              alt={book.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = `https://via.placeholder.com/300x400/4A90E2/FFFFFF?text=${encodeURIComponent(book.title)}`;
                              }}
                            />
                          </figure>
                          <div className="card-body p-4">
                            <h2 className="card-title text-lg font-bold text-gray-800 line-clamp-2 min-h-[3rem]">
                              {book.title}
                            </h2>
                            <p className="text-gray-600 text-sm">by {book.author}</p>
                            {book.genre && (
                              <p className="text-xs">
                                <span className="badge badge-outline badge-sm">{book.genre}</span>
                              </p>
                            )}
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xl font-bold text-primary">
                                {parseFloat(book.price).toFixed(4)} ETH
                              </span>
                              <span className="badge badge-ghost">
                                Stock: {book.stock}
                              </span>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              {book.stock > 0 ? (
                                <span className="badge badge-success">✅ Available</span>
                              ) : (
                                <span className="badge badge-error">❌ Out of Stock</span>
                              )}
                              <span className="text-xs text-gray-500 font-mono">
                                ID: {book.id}
                              </span>
                            </div>
                            <div className="card-actions justify-between mt-3">
                              <button
                                className="btn btn-error btn-sm btn-circle"
                                onClick={async () => {
                                  const result = await removeFromWhitelist(book.id);
                                  if (result?.success) {
                                    setWhitelistedBookIds(prev => {
                                      const newSet = new Set(prev);
                                      newSet.delete(book.id);
                                      return newSet;
                                    });
                                    fetchWhitelist();
                                  }
                                }}
                                disabled={isWhitelisting}
                                title="Remove from favorites"
                              >
                                {isWhitelisting ? (
                                  <span className="loading loading-spinner loading-xs"></span>
                                ) : (
                                  '❤️'
                                )}
                              </button>
                              <button
                                className="btn btn-primary btn-sm flex-1 ml-2"
                                onClick={() => {
                                  if (book.stock > 0) {
                                    setSelectedBook(book);
                                    setPurchaseQuantity("1");
                                    setIsPurchaseModalOpen(true);
                                  }
                                }}
                                disabled={book.stock === 0}
                              >
                                {book.stock > 0 ? '🛒 Purchase' : 'Out of Stock'}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-500 text-sm">
      </footer>

      {/* Update Book Modal */}
      {isUpdateModalOpen && editingBook && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="glass-effect rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/30 animate-fade-in relative z-10">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold gradient-text">✏️ Update Book</h3>
                <button
                  onClick={() => {
                    setIsUpdateModalOpen(false);
                    setEditingBook(null);
                  }}
                  className="btn btn-sm btn-circle btn-ghost"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Book Title</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered focus:input-primary"
                    value={updateFormData.title}
                    onChange={(e) => setUpdateFormData({ ...updateFormData, title: e.target.value })}
                    placeholder="Enter book title"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Author</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered focus:input-primary"
                    value={updateFormData.author}
                    onChange={(e) => setUpdateFormData({ ...updateFormData, author: e.target.value })}
                    placeholder="Enter author name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Price (ETH)</span>
                    </label>
                    <input
                      type="number"
                      step="0.0001"
                      className="input input-bordered focus:input-primary"
                      value={updateFormData.price}
                      onChange={(e) => setUpdateFormData({ ...updateFormData, price: e.target.value })}
                      placeholder="0.0000"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Stock Quantity</span>
                    </label>
                    <input
                      type="number"
                      className="input input-bordered focus:input-primary"
                      value={updateFormData.stock}
                      onChange={(e) => setUpdateFormData({ ...updateFormData, stock: e.target.value })}
                      placeholder="0"
                      min="0"
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Image URL</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered focus:input-primary"
                    value={updateFormData.imageUrl}
                    onChange={(e) => setUpdateFormData({ ...updateFormData, imageUrl: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Genre</span>
                  </label>
                  <select
                    className="select select-bordered focus:select-primary"
                    value={updateFormData.genre}
                    onChange={(e) => setUpdateFormData({ ...updateFormData, genre: e.target.value })}
                  >
                    <option value="">Select Genre</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Non-Fiction">Non-Fiction</option>
                    <option value="Science Fiction">Science Fiction</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Mystery">Mystery</option>
                    <option value="Romance">Romance</option>
                    <option value="Thriller">Thriller</option>
                    <option value="Biography">Biography</option>
                    <option value="History">History</option>
                    <option value="Science">Science</option>
                    <option value="Technology">Technology</option>
                    <option value="Philosophy">Philosophy</option>
                    <option value="Business">Business</option>
                    <option value="Self-Help">Self-Help</option>
                    <option value="General">General</option>
                  </select>
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    className="btn btn-primary flex-1"
                    onClick={handleUpdateBook}
                    disabled={isUpdatingBook || !updateFormData.title || !updateFormData.author || !updateFormData.price || !updateFormData.stock}
                  >
                    {isUpdatingBook ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Updating...
                      </>
                    ) : (
                      '✅ Update Book'
                    )}
                  </button>
                  <button
                    className="btn btn-outline flex-1"
                    onClick={() => {
                      setIsUpdateModalOpen(false);
                      setEditingBook(null);
                    }}
                    disabled={isUpdatingBook}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Book Confirmation Modal */}
      {isDeleteModalOpen && bookToDelete && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="glass-effect rounded-2xl shadow-2xl max-w-md w-full border border-white/30 animate-fade-in relative z-10">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-red-600">🗑️ Delete Book</h3>
                <button
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setBookToDelete(null);
                  }}
                  className="btn btn-sm btn-circle btn-ghost"
                  disabled={isDeletingBook}
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-gray-700">
                  Are you sure you want to delete <span className="font-bold">{bookToDelete.title}</span> by {bookToDelete.author}?
                </p>
                <p className="text-sm text-red-600 font-semibold">
                  ⚠️ This action cannot be undone. The book will be removed from the store.
                </p>

                <div className="flex gap-4 mt-6">
                  <button
                    className="btn btn-error flex-1"
                    onClick={handleDeleteBook}
                    disabled={isDeletingBook}
                  >
                    {isDeletingBook ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Deleting...
                      </>
                    ) : (
                      '🗑️ Delete Book'
                    )}
                  </button>
                  <button
                    className="btn btn-outline flex-1"
                    onClick={() => {
                      setIsDeleteModalOpen(false);
                      setBookToDelete(null);
                    }}
                    disabled={isDeletingBook}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
