import { useState } from 'react';
import { Container, Row, Col, Breadcrumb, Button, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductCard } from '../products';
import { Header } from '../layout';
import './ProductsPage.css';

const ProductsPage = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // Products data based on your HTML
  const productsData = {
    'white-gut-controllers': {
      categoryName: 'WHITE GUT CONTROLLERS',
      categoryDescription: 'Specialized products for maintaining healthy gut conditions in aquatic environments',
      products: [
        {
          id: 1731,
          name: '1. G-SOLVE',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/G-solve.png',
          description: 'Advanced white gut controller solution for aquaculture applications',
          url: 'https://leoaqualaboratories.com/product/white-gut-controller/',
          price: '299',
          originalPrice: '349',
          isNew: false,
          category: 'White Gut Controllers'
        },
        {
          id: 1660,
          name: 'LEGROS BIO',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/Legros.png',
          description: 'Bio-active solution for white gut control and prevention',
          url: 'https://leoaqualaboratories.com/product/legros-bio/',
          price: '449',
          originalPrice: '499',
          isNew: false,
          category: 'White Gut Controllers'
        }
      ]
    },
    'minerals': {
      categoryName: 'MINERALS',
      categoryDescription: 'Essential trace minerals and supplements for optimal aquaculture health and growth',
      products: [
        {
          id: 1678,
          name: '5. WHITE MIN',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/Whitemin.png',
          description: 'Most essential trace minerals for aquaculture',
          url: 'https://leoaqualaboratories.com/product/most-essential-trace-minerals/',
          price: '399',
          originalPrice: '449',
          isNew: false,
          category: 'Minerals'
        },
        {
          id: 1658,
          name: '6. LEAD',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/Lead.png',
          description: 'RMS controller for aquatic environments',
          url: 'https://leoaqualaboratories.com/product/lead/',
          price: '349',
          originalPrice: '399',
          isNew: false,
          category: 'Minerals'
        },
        {
          id: 1703,
          name: '7. MINRISE',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/Minrise.png',
          description: 'Ideal mineral mixture for optimal growth',
          url: 'https://leoaqualaboratories.com/product/minrise/',
          price: '429',
          originalPrice: '479',
          isNew: false,
          category: 'Minerals'
        },
        {
          id: 1729,
          name: 'CALMINPHOS',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/Calmin.png',
          description: 'Keeping strong and healthy calcium phosphorus supplement',
          url: 'https://leoaqualaboratories.com/product/keeping-strong-healthy/',
          price: '459',
          originalPrice: '509',
          isNew: false,
          category: 'Minerals'
        },
        {
          id: 1601,
          name: 'EXTRAMIN+',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/Extramin.png',
          description: 'Enhanced mineral supplement for superior results',
          url: 'https://leoaqualaboratories.com/product/extramin/',
          price: '389',
          originalPrice: '439',
          isNew: false,
          category: 'Minerals'
        },
        {
          id: 1671,
          name: 'LEOMIN',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/Loemin.png',
          description: 'Aqua minerals specially formulated for shrimp culture',
          url: 'https://leoaqualaboratories.com/product/leomin/',
          price: '419',
          originalPrice: '469',
          isNew: false,
          category: 'Minerals'
        },
        {
          id: 1693,
          name: 'MIN BALANCE',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/Min-Balance.png',
          description: 'High concentrated feed minerals for balanced nutrition',
          url: 'https://leoaqualaboratories.com/product/min-balance/',
          price: '439',
          originalPrice: '489',
          isNew: false,
          category: 'Minerals'
        },
        {
          id: 1725,
          name: 'ORGAMIN',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/Orgamin.png',
          description: '100% water soluble organic minerals',
          url: 'https://leoaqualaboratories.com/product/100-water-soluble-organic-minerals/',
          price: '479',
          originalPrice: '529',
          isNew: true,
          category: 'Minerals'
        },
        {
          id: 1683,
          name: 'TRI-MIN',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/Trimin.png',
          description: 'Purified minerals: Magnesium, Calcium, Potassium',
          url: 'https://leoaqualaboratories.com/product/purified-minerals-magnesium-calcium-potassium/',
          price: '409',
          originalPrice: '459',
          isNew: false,
          category: 'Minerals'
        }
      ]
    },
    'ammonia-reducers': {
      categoryName: 'AMMONIA REDUCERS',
      categoryDescription: 'Effective solutions for reducing harmful ammonia levels in water systems',
      products: [
        {
          id: 1712,
          name: 'ODA HEAL',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/Oda-Heal.png',
          description: 'Advanced ammonia reduction and water healing solution',
          url: 'https://leoaqualaboratories.com/product/oda-heal/',
          price: '329',
          originalPrice: '379',
          isNew: false,
          category: 'Ammonia Reducers'
        },
        {
          id: 1672,
          name: 'YUCCA PLUS',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/YuccaPlus.png',
          description: 'Natural ammonia reducer with yucca extract',
          url: 'https://leoaqualaboratories.com/product/yucca-plus/',
          price: '359',
          originalPrice: '409',
          isNew: false,
          category: 'Ammonia Reducers'
        }
      ]
    },
    'bottom-cleaners': {
      categoryName: 'BOTTOM CLEANERS',
      categoryDescription: 'Specialized cleaners for maintaining clean and healthy bottom conditions',
      products: [
        {
          id: 1639,
          name: 'GEO-GRAN',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/Geo-Gran.png',
          description: 'Specially made for bottom cleaner in aquaculture systems',
          url: 'https://leoaqualaboratories.com/product/geo-gran/',
          price: '289',
          originalPrice: '329',
          isNew: false,
          category: 'Bottom Cleaners'
        },
        {
          id: 1668,
          name: 'ZEO-CURE',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/Zeolite.png',
          description: 'Excellent soil cleaner with zeolite technology',
          url: 'https://leoaqualaboratories.com/product/zeo-cure/',
          price: '319',
          originalPrice: '369',
          isNew: false,
          category: 'Bottom Cleaners'
        }
      ]
    },
    'feed-supplements': {
      categoryName: 'FEED SUPPLEMENTS',
      categoryDescription: 'Nutritional supplements and additives for enhanced feeding programs',
      products: [
        {
          id: 1733,
          name: '2. GROWJET',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/Growjet.png',
          description: 'Growth promoter for enhanced aquaculture development',
          url: 'https://leoaqualaboratories.com/product/growth-promoter/',
          price: '389',
          originalPrice: '439',
          isNew: false,
          category: 'Feed Supplements'
        },
        {
          id: 1727,
          name: '3. RAPID-K',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/Rapid-K.png',
          description: 'Liquid potash supplement for rapid growth',
          url: 'https://leoaqualaboratories.com/product/liquid-potash/',
          price: '349',
          originalPrice: '399',
          isNew: false,
          category: 'Feed Supplements'
        },
        {
          id: 1711,
          name: '4. PATHO NIL',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/Pathonil.png',
          description: 'Natural antibiotic for pathogen control',
          url: 'https://leoaqualaboratories.com/product/natural-antibiotich/',
          price: '429',
          originalPrice: '479',
          isNew: false,
          category: 'Feed Supplements'
        },
        {
          id: 1636,
          name: 'ADDGEL',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/Addgel.png',
          description: 'Binder with protein, vitamins & carbohydrates in gel formation',
          url: 'https://leoaqualaboratories.com/product/1636/',
          price: '299',
          originalPrice: '349',
          isNew: false,
          category: 'Feed Supplements'
        },
        {
          id: 1596,
          name: 'CALCIGROW',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/Calci.png',
          description: 'Calcium supplement for healthy shell development',
          url: 'https://leoaqualaboratories.com/product/calcigrow/',
          price: '359',
          originalPrice: '409',
          isNew: false,
          category: 'Feed Supplements'
        },
        {
          id: 1637,
          name: 'FREE-CRAMP',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/Freecramp.png',
          description: 'Growth promoter and muscle cramp prevention',
          url: 'https://leoaqualaboratories.com/product/free-cramp/',
          price: '379',
          originalPrice: '429',
          isNew: false,
          category: 'Feed Supplements'
        },
        {
          id: 1645,
          name: 'GROW-LIV',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/Groliv.png',
          description: 'Liver health and growth enhancement supplement',
          url: 'https://leoaqualaboratories.com/product/grow-liv/',
          price: '399',
          originalPrice: '449',
          isNew: false,
          category: 'Feed Supplements'
        },
        {
          id: 1664,
          name: 'LEO FORCE',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/Leoforce.png',
          description: 'Comprehensive feed supplement for enhanced performance',
          url: 'https://leoaqualaboratories.com/product/leo-force/',
          price: '449',
          originalPrice: '499',
          isNew: false,
          category: 'Feed Supplements'
        },
        {
          id: 1667,
          name: 'LEO LACT',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/Leo-Lact.png',
          description: 'Helps maintain good shrimp gut health',
          url: 'https://leoaqualaboratories.com/product/leo-lact/',
          price: '369',
          originalPrice: '419',
          isNew: false,
          category: 'Feed Supplements'
        },
        {
          id: 1662,
          name: 'LEO-C',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/Leo-C.png',
          description: 'Ascorbic acid 50% - Vitamin C supplement',
          url: 'https://leoaqualaboratories.com/product/leo-c/',
          price: '319',
          originalPrice: '369',
          isNew: false,
          category: 'Feed Supplements'
        },
        {
          id: 1679,
          name: 'LEOSTIM',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/Leostim.png',
          description: 'For good health and good resistance',
          url: 'https://leoaqualaboratories.com/product/leostim/',
          price: '409',
          originalPrice: '459',
          isNew: false,
          category: 'Feed Supplements'
        },
        {
          id: 1690,
          name: 'REVIT',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/Revit.png',
          description: 'Hi-concentrate vitamins for complete nutrition',
          url: 'https://leoaqualaboratories.com/product/hi-concentrate-vitamins/',
          price: '459',
          originalPrice: '509',
          isNew: true,
          category: 'Feed Supplements'
        }
      ]
    },
    'moulting-enhancers': {
      categoryName: 'MOULTING ENHANCERS',
      categoryDescription: 'Specialized products to enhance moulting process in crustaceans',
      products: [
        {
          id: 1697,
          name: '9. QUICK-MOULT',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/Quick-Molt.png',
          description: 'Rapid moult stimulant for enhanced crustacean development',
          url: 'https://leoaqualaboratories.com/product/rapid-moult-stimulant/',
          price: '439',
          originalPrice: '489',
          isNew: false,
          category: 'Moulting Enhancers'
        },
        {
          id: 1695,
          name: 'REAL EDTA',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/Real-EDTA.png',
          description: 'The true EDTA for effective water treatment',
          url: 'https://leoaqualaboratories.com/product/the-true-edta/',
          price: '399',
          originalPrice: '449',
          isNew: false,
          category: 'Moulting Enhancers'
        },
        {
          id: 1686,
          name: 'SOFTNER',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/softner.png',
          description: 'High concentrated ethylene diamine tetra acetic acid',
          url: 'https://leoaqualaboratories.com/product/high-concentrated-ethylene-diamine-tetra-acetic-acid/',
          price: '359',
          originalPrice: '409',
          isNew: false,
          category: 'Moulting Enhancers'
        }
      ]
    },
    'oxygen-producers': {
      categoryName: 'OXYGEN PRODUCERS',
      categoryDescription: 'Advanced oxygen enhancement solutions for optimal water conditions',
      products: [
        {
          id: 1699,
          name: '8. POND FRESH',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/Pondfresh.png',
          description: 'Dissolved oxygen producer and good bottom conditioner',
          url: 'https://leoaqualaboratories.com/product/dissolved-oxygen-produce-and-good-bottom-conditioner/',
          price: '419',
          originalPrice: '469',
          isNew: false,
          category: 'Oxygen Producers'
        },
        {
          id: 1597,
          name: 'CALCIUM PEROXIDE',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2023/11/Calcium.png',
          description: 'With sodium percarbonate for enhanced oxygen release',
          url: 'https://leoaqualaboratories.com/product/calcium-peroxide/',
          price: '299',
          originalPrice: '349',
          isNew: false,
          category: 'Oxygen Producers'
        },
        {
          id: 1716,
          name: 'OXY-ZONE',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/Oxyzone.png',
          description: 'DO enhancer for improved dissolved oxygen levels',
          url: 'https://leoaqualaboratories.com/product/do-enhancer/',
          price: '379',
          originalPrice: '429',
          isNew: false,
          category: 'Oxygen Producers'
        },
        {
          id: 1718,
          name: 'OXYGAIN GRANULES',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/Oxygain.png',
          description: 'Sustained oxygen releaser for long-lasting effects',
          url: 'https://leoaqualaboratories.com/product/sustained-oxygen-releaser/',
          price: '439',
          originalPrice: '489',
          isNew: false,
          category: 'Oxygen Producers'
        },
        {
          id: 1721,
          name: 'OXY PLUS',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/Oxyplus.png',
          description: 'Advanced oxygen tabs for convenient application',
          url: 'https://leoaqualaboratories.com/product/tabs/',
          price: '359',
          originalPrice: '409',
          isNew: false,
          category: 'Oxygen Producers'
        }
      ]
    },
    'ph-reducers': {
      id: 'ph-reducers',
      categoryName: 'pH Reducers',
      categoryDescription: 'Advanced pH control solutions for optimal aquatic environment maintenance.',
      products: [
        {
          id: 'ph-controller',
          title: 'PH CONTROLLER',
          description: 'Excellent pH controller for maintaining optimal water conditions in aquaculture systems.',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/PH-Controler.png',
          url: 'https://leoaqualaboratories.com/product/excellent-p-controller/',
          price: '299',
          originalPrice: '349',
          isNew: false,
          category: 'pH Reducers'
        }
      ]
    },
    'probiotics-water-solids': {
      id: 'probiotics-water-solids',
      categoryName: 'Probiotics Water and Solids',
      categoryDescription: 'Beneficial bacteria and probiotic solutions for water and soil health in aquaculture.',
      products: [
        {
          id: 'germs',
          title: 'GERMS',
          description: 'Water and soil probiotic granules for maintaining healthy pond environment.',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/Germs.png',
          url: 'https://leoaqualaboratories.com/product/germs/',
          price: '329',
          originalPrice: '379',
          isNew: false,
          category: 'Probiotics Water and Solids'
        },
        {
          id: 'hydro-bact',
          title: 'HYDRO-BACT',
          description: 'Most powerful water probiotics for optimal aquatic environment management.',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/Hydrobact.png',
          url: 'https://leoaqualaboratories.com/product/hydro-bact/',
          price: '349',
          originalPrice: '399',
          isNew: false,
          category: 'Probiotics Water and Solids'
        },
        {
          id: 'leo-pro',
          title: 'LEO PRO',
          description: 'Good maintenance of pond environment with advanced probiotic formulation.',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/Leopro.png',
          url: 'https://leoaqualaboratories.com/product/leo-pro/',
          price: '309',
          originalPrice: '359',
          isNew: false,
          category: 'Probiotics Water and Solids'
        },
        {
          id: 'mega-ps',
          title: 'MEGA PS',
          description: 'Useful bacteria supplement for enhanced aquatic ecosystem health.',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/Mega-Ps.png',
          url: 'https://leoaqualaboratories.com/product/mega-ps/',
          price: '339',
          originalPrice: '389',
          isNew: false,
          category: 'Probiotics Water and Solids'
        },
        {
          id: 'microbes',
          title: 'MICROBES',
          description: 'Vannamei vibriocare solution for shrimp health and disease prevention.',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/Microbes.png',
          url: 'https://leoaqualaboratories.com/product/microbes/',
          price: '319',
          originalPrice: '369',
          isNew: false,
          category: 'Probiotics Water and Solids'
        },
        {
          id: 'nitro-nb',
          title: 'NITRO NB',
          description: 'Complete water soil pollution controller for comprehensive pond management.',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/NitroNB.png',
          url: 'https://leoaqualaboratories.com/product/nitro-nb/',
          price: '359',
          originalPrice: '409',
          isNew: false,
          category: 'Probiotics Water and Solids'
        },
        {
          id: 'plankto-bloom',
          title: 'Plankto Bloom',
          description: 'Producing rich plankton for fish and prawns to enhance natural food sources.',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/Planktobloom.png',
          url: 'https://leoaqualaboratories.com/product/producing-rich-plankton-for-fish-and-prawans/',
          price: '329',
          originalPrice: '379',
          isNew: false,
          category: 'Probiotics Water and Solids'
        },
        {
          id: 'sludge-cleaner',
          title: 'SLUDGE CLEANER',
          description: 'Sulpher and nitrifying bacteria for effective pond bottom cleaning.',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/Sludge.png',
          url: 'https://leoaqualaboratories.com/product/sulpher-and-nitrifying-bacteria/',
          price: '349',
          originalPrice: '399',
          isNew: false,
          category: 'Probiotics Water and Solids'
        }
      ]
    },
    'sanitizers': {
      id: 'sanitizers',
      categoryName: 'Sanitizers',
      categoryDescription: 'Comprehensive sanitization and disinfection solutions for aquaculture systems.',
      products: [
        {
          id: 'aquaguard',
          title: 'AQUAGUARD',
          description: 'Perfect disinfectant for comprehensive aquatic system sanitization.',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/aquaguard.png',
          url: 'https://leoaqualaboratories.com/product/aquaguard-perfect-disinfectant/',
          price: '289',
          originalPrice: '339',
          isNew: false,
          category: 'Sanitizers'
        },
        {
          id: 'bactodine',
          title: 'BACTODINE',
          description: 'Effective bactericidal solution for pond and equipment sanitization.',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/Bactodin.png',
          url: 'https://leoaqualaboratories.com/product/bactodin/',
          price: '319',
          originalPrice: '369',
          isNew: false,
          category: 'Sanitizers'
        },
        {
          id: 'biocure',
          title: 'BioCure',
          description: 'Advanced bio-sanitizer for comprehensive aquatic health management.',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/Biocure.png',
          url: 'https://leoaqualaboratories.com/product/biocure/',
          price: '329',
          originalPrice: '379',
          isNew: false,
          category: 'Sanitizers'
        },
        {
          id: 'biophore-20',
          title: 'BIOPHORE 20%',
          description: 'Antifungal, antibacterial and anti-viral solution for complete protection.',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/Biophore-1.png',
          url: 'https://leoaqualaboratories.com/product/bio-cure/',
          price: '359',
          originalPrice: '409',
          isNew: false,
          category: 'Sanitizers'
        },
        {
          id: 'd-viral',
          title: 'D-VIRAL',
          description: 'Specialized antiviral solution for disease prevention in aquaculture.',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/D-Viral.png',
          url: 'https://leoaqualaboratories.com/product/d-viral/',
          price: '339',
          originalPrice: '389',
          isNew: false,
          category: 'Sanitizers'
        },
        {
          id: 'ex-gill',
          title: 'EX GILL',
          description: 'Specialized treatment for gill health and respiratory system care.',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/Exgill.png',
          url: 'https://leoaqualaboratories.com/product/ex-gill/',
          price: '309',
          originalPrice: '359',
          isNew: false,
          category: 'Sanitizers'
        },
        {
          id: 'germicide',
          title: 'GERMICIDE',
          description: 'Powerful germicide with moult inducer properties for enhanced growth.',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/Germicide.png',
          url: 'https://leoaqualaboratories.com/product/germicide/',
          price: '299',
          originalPrice: '349',
          isNew: false,
          category: 'Sanitizers'
        },
        {
          id: 'gut-cure',
          title: 'GUT CURE',
          description: 'Keeps good gastrointestinal track of shrimp for optimal health.',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/Gut-Care.png',
          url: 'https://leoaqualaboratories.com/product/gut-cure/',
          price: '329',
          originalPrice: '379',
          isNew: false,
          category: 'Sanitizers'
        },
        {
          id: 'gutazen',
          title: 'GUTAZEN',
          description: 'Exclusive water sanitizer for comprehensive aquatic environment care.',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/Gutazen.png',
          url: 'https://leoaqualaboratories.com/product/gutazen/',
          price: '319',
          originalPrice: '369',
          isNew: false,
          category: 'Sanitizers'
        },
        {
          id: 'hydrocure',
          title: 'HYDROCURE',
          description: 'Controls pathogens - powerful sanitizer for water treatment.',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/Hydrocure.png',
          url: 'https://leoaqualaboratories.com/product/hydrocure/',
          price: '349',
          originalPrice: '399',
          isNew: false,
          category: 'Sanitizers'
        },
        {
          id: 'jet-37',
          title: 'JET 37',
          description: 'Top performance sanitizer for maximum efficiency in aquaculture systems.',
          imageUrl: 'https://leoaqualaboratories.com/wp-content/uploads/2025/03/Jet37.png',
          url: 'https://leoaqualaboratories.com/product/jet-37/',
          price: '369',
          originalPrice: '419',
          isNew: false,
          category: 'Sanitizers'
        }
      ]
    }
  };

  const currentCategory = productsData[categoryId];

  if (!currentCategory) {
    return (
      <div className="products-page">
        <Header />
        <Container className="py-5">
          <Row>
            <Col className="text-center">
              <h2>Category Not Found</h2>
              <p>The requested category does not exist.</p>
              <Button variant="primary" onClick={() => navigate('/categories')}>
                Back to Categories
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }



  return (
    <div className="products-page">
      <Header />
      
      <Container fluid className="products-container">
        {/* Alert for user feedback */}
        {showAlert && (
          <Alert 
            variant="info" 
            dismissible 
            onClose={() => setShowAlert(false)}
            className="mb-4"
          >
            <Alert.Heading>Product Information</Alert.Heading>
            <p>{alertMessage}</p>
          </Alert>
        )}

        {/* Breadcrumb Navigation */}
        <Row className="mb-4">
          <Col>
            <Breadcrumb className="custom-breadcrumb">
              <Breadcrumb.Item 
                onClick={() => navigate('/')}
                style={{ cursor: 'pointer', color: 'var(--bs-primary)' }}
              >
                Home
              </Breadcrumb.Item>
              <Breadcrumb.Item 
                onClick={() => navigate('/categories')}
                style={{ cursor: 'pointer', color: 'var(--bs-primary)' }}
              >
                Leo Aqua Categories
              </Breadcrumb.Item>
              <Breadcrumb.Item active>{currentCategory.categoryName}</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>

        {/* Category Header */}
        {/* <Row className="mb-5">
          <Col lg={8} className="mx-auto text-center">
            <div className="category-header">
              <h1 className="category-title">{currentCategory.categoryName}</h1>
              <p className="category-subtitle">
                {currentCategory.categoryDescription}
              </p>
              <div className="category-stats">
                <div className="stat-item">
                  <span className="stat-number">{currentCategory.products.length}</span>
                  <span className="stat-label">Products Available</span>
                </div>
              </div>
            </div>
          </Col>
        </Row> */}

        {/* Products Grid */}
        <Row className="products-grid">
          {currentCategory.products.map((product, index) => (
            <Col 
              key={product.id}
              xl={4}
              lg={6}
              md={6}
              sm={12}
              className="mb-4"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard
                product={product}
              />
            </Col>
          ))}
        </Row>

        {/* Contact Information */}
        <Row className="mt-5">
          <Col lg={8} className="mx-auto">
            <div className="contact-section">
              <h3 className="text-center mb-4">Need More Information?</h3>
              <div className="contact-grid">
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className="contact-info">
                    <h5>Call Us</h5>
                    <p>Contact Leo Aqua Laboratories directly for product inquiries and pricing</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="contact-info">
                    <h5>Email Support</h5>
                    <p>Get detailed product specifications and technical support</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-globe"></i>
                  </div>
                  <div className="contact-info">
                    <h5>Visit Website</h5>
                    <p>Explore the complete Leo Aqua product catalog online</p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Back Navigation */}
        <Row className="mt-5">
          <Col className="text-center">
            <Button 
              variant="outline-primary" 
              size="lg"
              onClick={() => navigate('/categories')}
              className="me-3"
            >
              <i className="fas fa-arrow-left me-2"></i>
              Back to Categories
            </Button>
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => window.open('https://leoaqualaboratories.com/product-category/white-gut-controllers/', '_blank')}
            >
              <i className="fas fa-external-link-alt me-2"></i>
              Visit Leo Aqua Store
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductsPage;