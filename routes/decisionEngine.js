const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Decision = require('../models/Decision');

// 🔍 POST /api/decision/analyze
router.post('/analyze', (req, res) => {
  const { user, inputProduct, alternateProduct } = req.body;

  const response = {
    user,
    inputProduct,
    alternateProduct,
    timelines: [
      {
        choice: inputProduct.name,
        impact: {
          health: "Improved posture and focus",
          career: "Promotion due to better productivity",
          emotion: "Happier and stress-free"
        },
        score: 85
      },
      {
        choice: alternateProduct.name,
        impact: {
          health: "Back pain, fatigue",
          career: "Decreased performance",
          emotion: "Frustrated and unmotivated"
        },
        score: 45
      }
    ]
  };

  res.json(response);
});

// 💾 POST /api/decision/save (secured)
router.post('/save', auth, async (req, res) => {
  const { inputProduct, alternateProduct, result } = req.body;

  try {
    const decision = new Decision({
      userId: req.user, // user ID from token
      inputProduct,
      alternateProduct,
      result
    });
    await decision.save();
    res.json({ msg: 'Decision saved successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Error saving decision', error });
  }
});

// 📜 GET /api/decision/history/:userId (secured)
router.get('/history/:userId', auth, async (req, res) => {
  if (req.user !== req.params.userId) {
    return res.status(403).json({ msg: 'Access denied. You can only view your own history.' });
  }

  try {
    const decisions = await Decision.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(decisions);
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching decision history', error });
  }
});

// ✅ Export the router at the END
module.exports = router;
