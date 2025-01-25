import React, { useState } from "react";
import { Box, Button, Grid, TextField, Typography, Divider, Paper, IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

export interface IFaq {
  question: string;
  answer: string;
}

interface FaqComponentProps {
  faqs: IFaq[];
  onFaqChange: (faqs: IFaq[]) => void;
  validationErrors: Record<string, string>;
  id:string
}

const FaqComponent: React.FC<FaqComponentProps> = ({ faqs, onFaqChange, validationErrors }) => {
  const [newFaq, setNewFaq] = useState<IFaq>({ question: "", answer: "" });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleAddFaq = () => {
    if (newFaq.question.trim() && newFaq.answer.trim()) {
      if (editIndex !== null) {
        // Edit existing FAQ
        const updatedFaqs = [...faqs];
        updatedFaqs[editIndex] = newFaq;
        onFaqChange(updatedFaqs);
        setEditIndex(null);
      } else {
        // Add new FAQ
        onFaqChange([...faqs, newFaq]);
      }
      setNewFaq({ question: "", answer: "" });
    }
  };

  const handleEditFaq = (index: number) => {
    setNewFaq(faqs[index]);
    setEditIndex(index);
  };

  const handleRemoveFaq = (index: number) => {
    const updatedFaqs = faqs.filter((_, i) => i !== index);
    onFaqChange(updatedFaqs);
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, borderRadius: "8px", mt: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
        FAQs
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {/* Add/Edit FAQ Form */}
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={5}>
          <TextField
            fullWidth
            value={newFaq.question}
            onChange={(e) => setNewFaq((prev) => ({ ...prev, question: e.target.value }))}
            placeholder="Question"
            variant="outlined"
            error={!!validationErrors["faq.question"]}
            helperText={validationErrors["faq.question"]}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            fullWidth
            value={newFaq.answer}
            onChange={(e) => setNewFaq((prev) => ({ ...prev, answer: e.target.value }))}
            placeholder="Answer"
            variant="outlined"
            error={!!validationErrors["faq.answer"]}
            helperText={validationErrors["faq.answer"]}
          />
        </Grid>
        <Grid item display={"flex"} justifyContent={"end"} sx={{ width: "100%" }} xs={12} sm={2}>
          <Button variant="contained" color="primary" onClick={handleAddFaq}>
            {editIndex !== null ? "Update" : "Add"}
          </Button>
        </Grid>
      </Grid>

      {/* Display FAQs */}
      {faqs.map((faq, index) => (
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} key={index} sx={{ mt: 2, p: 2, border: "1px solid #ddd", borderRadius: "4px" }}>
          <Box sx={{ mt: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              {faq.question}
            </Typography>
            <Typography variant="body1">{faq.answer}</Typography>
          </Box>
          <Box sx={{ mt: 1 }}>
            <IconButton color="primary" onClick={() => handleEditFaq(index)}>
              <Edit />
            </IconButton>
            <IconButton color="error" onClick={() => handleRemoveFaq(index)}>
              <Delete />
            </IconButton>
          </Box>
        </Box>
      ))}
    </Paper>
  );
};

export default FaqComponent;